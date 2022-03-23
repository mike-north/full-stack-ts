import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';
import TwitterQueryResolver from './resolvers/Query';
import TwitterMutationResolver from './resolvers/Mutation';
import TwitterTweetResolver from './resolvers/Tweet';
import TwitterUserResolver from './resolvers/User';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

export function createResolvers(): Resolvers<TwitterResolverContext> {
  const resolvers = {
    Query: TwitterQueryResolver,
    Mutation: TwitterMutationResolver,
    Tweet: TwitterTweetResolver,
    User: TwitterUserResolver,
  };
  return resolvers;
}
