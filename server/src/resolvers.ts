import Query from './resolvers/Query'
import User from './resolvers/User'
import Trend from './resolvers/Trend'
import Tweet from './resolvers/Tweet'
import Mutation from './resolvers/Mutation'
import { Resolvers } from "./resolvers-types.generated"
import Db, { DbTweet, DbUser } from "./db"

export interface TwitterResolverContext {
  db: Db,
  dbTweetCache: Record<string, DbTweet>,
  dbUserCache: Record<string, DbUser>,
  dbTweetToFavoriteCountMap: Record<string, number>,
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  User,
  Mutation,
  Tweet,
  Trend
};

export default resolvers;
