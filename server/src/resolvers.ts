import Db from './db';
import { Resolvers } from 'resolvers-types.generated';
import { tweetTransform, userTransform } from './transforms';

function createResolvers(db: Db): Resolvers {
  const resolvers: Resolvers = {
    Query: {
      currentUser() {
        const dbUser = db.getFirstUser();
        return userTransform(dbUser);
      },
      user(_parent, args) {
        const { id } = args;
        const dbUser = db.getUserById(id);
        if (!dbUser) return null;
        return userTransform(dbUser);
      },
      tweet(_parent, args) {
        const { id } = args;
        const dbTweet = db.getTweetById(id);
        const author = db.getUserById(dbTweet.userId);
        if (!author) throw new Error(`Null author for tweet ${dbTweet.id}`);
        if (!dbTweet) return null;
        return { ...tweetTransform(dbTweet), author };
      },
      tweets(_parent, args) {
        const { authorId } = args;
        const dbTweets = db.getTweetsByUserId(authorId);
        if (!dbTweets) return null;
        return dbTweets.map((t) => {
          const author = db.getUserById(t.userId);
          if (!author) throw new Error(`Null author for tweet ${t.id}`);
          return { ...tweetTransform(t), author };
        });
      },
    },
    User: {
      tweets(user) {
        const rawTweets = db.getUserTweets(user.id);
        return rawTweets.map((t) => ({
          id: t.id,
          body: t.message,
          favorites: [] as any[],
          author: user,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          deletedAt: t.deletedAt,
        }));
      },
    },
    Tweet: {
      author(tweet) {
        const rawAuthor = db.getUserById(tweet.author.id);
        if (!rawAuthor) throw new Error(`No user with id ${tweet.author.id}`);
        return userTransform(rawAuthor);
      },
    },
  };
  return resolvers;
}
export default createResolvers;
