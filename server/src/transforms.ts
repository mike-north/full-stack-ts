import { DbFavorite, DbTweet, DbUser } from "./db";
import { Favorite, Tweet, User } from "resolvers-types.generated";

export const userTransform = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    handle: dbUser.handle,
    name: dbUser.name,
    avatarUrl: dbUser.avatarUrl,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
  };
};

export const tweetTransform = (t: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: t.id,
    body: t.message,
    favorites: [] as any[],
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};
export const favoriteTransform = (t: DbFavorite): Omit<Favorite, 'user'|'tweet'> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
};
