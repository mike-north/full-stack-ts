import { DbFavorite, DbSuggestion, DbTrend, DbTweet, DbUser } from './db';
import {
  Favorite,
  Suggestion,
  Trend,
  Tweet,
  User,
} from 'resolvers-types.generated';

export const userTransform = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    handle: dbUser.handle,
    name: dbUser.name,
    coverUrl: dbUser.coverUrl,
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

export const favoriteTransform = (
  t: DbFavorite
): Omit<Favorite, 'user' | 'tweet'> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};

export const trendTransform = (t: DbTrend): Trend => {
  const { tweetCount } = t;
  if (t.kind === 'topic') {
    const { topic, quote } = t;
    return { tweetCount, topic, quote };
  } else {
    const { hashtag } = t;
    return { tweetCount, hashtag };
  }
};

export const suggestionTransform = (t: DbSuggestion): Suggestion => {
  return t;
};
