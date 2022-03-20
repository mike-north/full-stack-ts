import { DbTweet, DbUser } from "db-types";
import { Tweet, User } from "resolvers-types.generated";

export const userTransform = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    handle: dbUser.handle,
    name: dbUser.name,
    avatarUrl: dbUser.avatarUrl,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    deletedAt: dbUser.deletedAt,
  };
};

export const tweetTransform = (t: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: t.id,
    body: t.message,
    favorites: [] as any[],
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    deletedAt: t.deletedAt,
  };
};
