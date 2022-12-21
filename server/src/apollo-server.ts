import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import {
  ApolloServer,
  ExpressContext,
  gql,
} from "apollo-server-express"
import * as express from "express"
import { Server } from "http"
import Db from "./db"
export async function createApolloServer(
  _db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const typeDefs = gql`
    type Query {
      currentUser: User!
      suggestions: [Suggestion!]!
    }
    type User {
      id: String!
      name: String!
      handle: String!
      coverUrl: String!
      avatarUrl: String!
      createdAt: String!
      updatedAt: String!
    }
    type Suggestion {
      name: String!
      handle: String!
      avatarUrl: String!
      reason: String!
    }
  `
  const server = new ApolloServer({
    typeDefs,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  })
  await server.start()
  server.applyMiddleware({ app })
  return server
}
