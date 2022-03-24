import Query from './resolvers/Query'
import { Resolvers } from "./resolvers-types.generated"
import Db from "./db"

export interface TwitterResolverContext {
  db: Db
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query
};

export default resolvers;
