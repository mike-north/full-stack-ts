import { DbFavorite, DbTweet } from './db';
import { Favorite, Tweet } from './resolvers-types.generated';

export const tweetTransform = (t: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: t.id,
    body: t.message,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};

export const favoriteTransform = (
  t: DbFavorite
): Omit<Favorite, 'user' | 'tweet'> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};
