import { default as Db, DbTweet, DbFavorite, DbUser } from './db';
import { Resolvers } from 'resolvers-types.generated';
import { favoriteTransform, tweetTransform, userTransform } from './transforms';

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
    },
    Mutation: {
      createTweet(_parent, args, context) {
        const { body, userId } = args;
        const dbTweet = db.createTweet({ message: body, userId });
        const dbTweetMap = (context.dbTweetMap ||= {});
        dbTweetMap[dbTweet.id] = dbTweet;
        return tweetTransform(dbTweet);
      },
      createFavorite(_parent, args, context) {
        const { tweetId, userId } = args;
        const dbFavorite = db.createFavorite({ tweetId, userId });
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        dbFavoriteMap[dbFavorite.id] = dbFavorite;
        return favoriteTransform(dbFavorite);
      },
      deleteFavorite(_parent, args, context) {
        const { tweetId, userId } = args;
        const dbFavoriteMap = (context.dbFavoriteMap ||= {});
        const dbFavorite = db.deleteFavorite({ tweetId, userId });
        dbFavoriteMap[dbFavorite.id] = dbFavorite;
        return favoriteTransform(dbFavorite);
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
      statistics(user) {
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
      favoriteCount(tweet) {
        const { id } = tweet;
        return db.getFavoriteCountForTweet(id);
      },
      commentCount(_tweet) {
        return 99;
      },
      retweetCount(_tweet) {
        return 999;
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
