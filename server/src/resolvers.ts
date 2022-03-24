import Query from './resolvers/Query'
import User from './resolvers/User'
import Tweet from './resolvers/Tweet'
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
  Tweet
};

export default resolvers;
