import { tweetTransform } from '../transforms';
import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';

const TwitterMutationResolver: MutationResolvers<TwitterResolverContext> = {
  async createTweet(_parent, args, { dbTweetCache, db }) {
    const { body, userId } = args;
    const dbTweet = await db.createTweet({ message: body, userId });
    const dbTweetMap = (dbTweetCache ||= {});
    dbTweetMap[dbTweet.id] = dbTweet;
    return tweetTransform(dbTweet);
  },
};

export default TwitterMutationResolver;
