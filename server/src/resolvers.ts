import { Resolvers } from './resolvers-types.generated';
import { DbFavorite, DbTweet, DbUser, default as Db } from './db';
import {
  favoriteTransform,
  suggestionTransform,
  trendTransform,
  tweetTransform,
  userTransform,
} from './transforms';

interface ResolverContext {
  currentUser?: DbUser;
  dbTweetMap?: Record<string, DbTweet>;
  dbFavoriteMap?: Record<string, DbFavorite>;
}

function createResolvers(db: Db): Resolvers<ResolverContext> {
  const resolvers: Resolvers<ResolverContext> = {
    Query: {
      currentUser(_parent, _args, context) {
        const dbUser = db.getFirstUser();
        context.currentUser = dbUser;
        return userTransform(dbUser);
      },
      user(_parent, args) {
        const { id } = args;
        const dbUser = db.getUserById(id);
        if (!dbUser) return null;
        return userTransform(dbUser);
      },
      tweets(_parent, _args, context) {
        const dbTweets = db.getAllTweets();
        const dbTweetMap = (context.dbTweetMap ||= {});

        return dbTweets.map((t) => {
          dbTweetMap[t.id] = t;
          return tweetTransform(t);
        });
      },
      trends() {
        return db.getAllTrends().map(trendTransform);
      },
      suggestions() {
        return db.getAllSuggestions().map(suggestionTransform);
      },
    },
    Mutation: {
      async createTweet(_parent, args, context) {
        const { body, userId } = args;
        const dbTweet = await db.createTweet({ message: body, userId });
        const dbTweetMap = (context.dbTweetMap ||= {});
        dbTweetMap[dbTweet.id] = dbTweet;
        return tweetTransform(dbTweet);
      },
      async createFavorite(_parent, args, context) {
        const { tweetId, userId } = args;
        const dbFavorite = await db.createFavorite({ tweetId, userId });
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        dbFavoriteMap[dbFavorite.id] = dbFavorite;
        return favoriteTransform(dbFavorite);
      },
      async deleteFavorite(_parent, args, context) {
        const { tweetId, userId } = args;
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        const dbFavorite = await db.deleteFavorite({ tweetId, userId });
        dbFavoriteMap[dbFavorite.id] = dbFavorite;
        return favoriteTransform(dbFavorite);
      },
    },
    Trend: {
      __resolveType(obj, _context, _info) {
        // Only Author has a name field
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof (obj as any).hashtag === 'string') {
          return 'HashtagTrend';
        } else return 'TopicTrend';
        return null; // GraphQLError is thrown
      },
    },
    User: {
      tweets(user, _args, context) {
        const rawTweets = db.getUserTweets(user.id);
        const dbTweetMap = (context.dbTweetMap ||= {});
        return rawTweets.map((t) => {
          dbTweetMap[t.id] = t;
          return tweetTransform(t);
        });
      },
      favorites(user, _args, context) {
        const rawFavorites = db.getUserFavorites(user.id);
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        return rawFavorites.map((f) => {
          dbFavoriteMap[f.id] = f;
          return favoriteTransform(f);
        });
      },
      stats(user) {
        const dbTweets = db.getUserTweets(user.id);
        return {
          user,
          followerCount: 88,
          tweetCount: dbTweets.length,
          followingCount: 77,
        };
      },
    },
    Favorite: {
      tweet(favorite, _args, context) {
        const { dbFavoriteMap } = context;
        if (!dbFavoriteMap)
          throw new Error(
            'Favorite.tweet resolver expected dbFavoriteMap to be populated, and it was found to be missing'
          );
        const dbFavorite = dbFavoriteMap[favorite.id];
        if (!dbFavorite)
          throw new Error(`Favorite ${favorite.id} not found in dbFavoriteMap`);
        const dbTweet = db.getTweetById(dbFavorite.tweetId);
        return tweetTransform(dbTweet);
      },
      user(favorite, _args, context) {
        const { dbFavoriteMap } = context;
        if (!dbFavoriteMap)
          throw new Error(
            'Favorite.tweet resolver expected dbFavoriteMap to be populated, and it was found to be missing'
          );
        const dbFavorite = dbFavoriteMap[favorite.id];
        if (!dbFavorite)
          throw new Error(`Favorite ${favorite.id} not found in dbFavoriteMap`);
        const dbUser = db.getUserById(dbFavorite.userId);
        return userTransform(dbUser);
      },
    },
    Tweet: {
      stats(tweet) {
        const { id } = tweet;
        return {
          favoriteCount: db.getFavoriteCountForTweet(id),
          retweetCount: 999,
          commentCount: 99,
        };
      },
      favorites(tweet, _args, context) {
        const { id } = tweet;
        const rawFavorites = db.getFavoritesForTweet(id);
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        return rawFavorites.map((f) => {
          dbFavoriteMap[f.id] = f;
          return favoriteTransform(f);
        });
      },
      author(tweet, _args, context) {
        const { dbTweetMap } = context;
        if (!dbTweetMap)
          throw new Error(
            'Tweet.author resolver expected dbTweetMap to be populated, and it was found to be missing'
          );
        const dbTweet = dbTweetMap[tweet.id];
        if (!dbTweet)
          throw new Error(`Tweet ${tweet.id} not found in dbTweetMap`);
        const dbUser = db.getUserById(dbTweet.userId);
        if (!dbUser) throw new Error(`Tweet ${tweet.id} has no author`);
        return userTransform(dbUser);
      },
    },
  };
  return resolvers;
}
export default createResolvers;
