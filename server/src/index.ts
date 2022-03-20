import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';

import { Config } from 'apollo-server';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import * as express from 'express';
import { createServer, Server } from 'http';
import { watchClientBuild } from './build-client';
import {
  DB_FILE_PATH,
  GRAPHQL_SCHEMA_PATH,
  PORT,
  STATIC_ROOT_FOLDER_PATH,
} from './constants';
import Db from './db';
import { seedDb } from './seed';
import {
  Resolver,
  Resolvers,
  ResolverTypeWrapper,
  User,
} from 'resolvers-types.generated';
import { DbUser } from 'db-types';

const schema = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

const app = express();

async function main() {
  console.log('Attempting to build and serve web UI on http://localhost:1234');
  watchClientBuild();
  const db = new Db(DB_FILE_PATH);
  if (db.getAllUsers().length === 0) {
    seedDb(db);
  }

  const userTransform = (dbUser: DbUser): User => {
    if (!dbUser) throw new Error('Null user');
    return {
      id: dbUser.id,
      handle: dbUser.handle,
      name: dbUser.name,
      avatarUrl: dbUser.avatarUrl,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
      deletedAt: dbUser.deletedAt,
    };
  };

  const resolvers: Resolvers = {
    Query: {
      currentUser() {
        const dbUser = db.getFirstUser();
        console.log({ dbUser });
        return userTransform(dbUser);
      },
      user(_parent, args, _context, info) {
        const { id } = args;
        const dbUser = db.getUserById(id);
        if (!dbUser) return null;
        return userTransform(dbUser);
      },
    },
    User: {
      tweets(user) {
        const rawTweets = db.getUserTweets(user.id);
        return rawTweets.map((t) => ({
          id: t.id,
          body: t.message,
          favorites: [] as any[],
          author: user,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          deletedAt: t.deletedAt,
        }));
      },
    },
  };
  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  app.use('/static', express.static(STATIC_ROOT_FOLDER_PATH));
  const httpServer = createServer(app);

  const apolloServer = await startApolloServer(
    { httpServer, app },
    { schemaWithResolvers }
  );

  await new Promise<void>((resolve) =>
    app.listen(PORT, () => {
      console.log(
        `API Listening on http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
      resolve();
    })
  );
}

async function startApolloServer(
  serverOptions: { httpServer: Server; app: express.Application },
  apolloOptions: {
    schemaWithResolvers: Exclude<Config<ExpressContext>['schema'], undefined>;
  }
): Promise<ApolloServer<ExpressContext>> {
  const { httpServer, app } = serverOptions;
  const { schemaWithResolvers } = apolloOptions;
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  return server;
}

main();
