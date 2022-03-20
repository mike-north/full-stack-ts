import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import Db from './db';
import createResolvers from './resolvers';
import { GRAPHQL_SCHEMA_PATH } from './constants';
import * as express from 'express';
import { ApolloServer, ExpressContext, Config } from 'apollo-server-express';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const schema = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

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

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: createResolvers(db),
  });

  const apolloServer = await startApolloServer(
    { httpServer, app },
    { schemaWithResolvers }
  );
  return apolloServer;
}
