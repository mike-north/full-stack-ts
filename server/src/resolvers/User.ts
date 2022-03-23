import { favoriteTransform, tweetTransform } from '../transforms';
import { TwitterResolverContext } from '../resolvers';
import { UserResolvers } from '../resolvers-types.generated';

const TwitterUserResolver: UserResolvers<TwitterResolverContext> = {
  stats(user, _, { db }) {
    return {
      followingCount: 123,
      followerCount: 456789,
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
  favorites(user, _, { db }) {
    const faves = db.getUserFavorites(user.id);
    return faves.map((f) => {
      return {
        ...favoriteTransform(f),
        user,
        tweet: tweetTransform(db.getTweetById(f.tweetId)),
      };
    });
  },
};

export default TwitterUserResolver;
