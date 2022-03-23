import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { v4 as uuid } from 'uuid';

export interface DbEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DbTweet extends DbEntity {
  message: string;
  userId: string;
}

export interface DbUser extends DbEntity {
  id: string;
  avatarUrl: string;
  handle: string;
  name: string;
  coverUrl: string;
}

export interface DbFavorite extends DbEntity {
  tweetId: string;
  userId: string;
}

export interface DbHashtagTrend {
  id: string;
  kind: 'hashtag';
  hashtag: string;
  tweetCount: number;
}
export interface DbTopicTrendQuote {
  id: string;
  topicTrendId: string;
  title: string;
  description: string;
  imageUrl: string;
}
export interface DbTopicTrend {
  id: string;
  kind: 'topic';
  topic: string;
  tweetCount: number;
  quote?: DbTopicTrendQuote;
}
export type DbTrend = DbTopicTrend | DbHashtagTrend;
export interface DbSuggestion {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  reason: string;
}

export interface DbSchema {
  tweets: DbTweet[];
  users: DbUser[];
  favorites: DbFavorite[];
  hashtagTrends: DbHashtagTrend[];
  suggestions: DbSuggestion[];
  topicTrends: DbTopicTrend[];
  topicTrendQuotes: DbTopicTrendQuote[];
}

class Db {
  private adapter;
  private db;

  constructor(filePath: string) {
    this.adapter = new FileSync<DbSchema>(filePath);
    this.db = low(this.adapter);
    this.db.read();
  }
  async initDefaults() {
    return await this.db
      .defaults<DbSchema>({
        tweets: [],
        users: [],
        favorites: [],
        hashtagTrends: [],
        topicTrends: [],
        topicTrendQuotes: [],
        suggestions: [],
      })
      .write();
  }

  getFirstUser(): DbUser {
    const firstUser = this.db.get('users').first().value();
    if (!firstUser) throw new Error('No users in database');
    return firstUser;
  }

  getUserById(id: string) {
    return this.db
      .get('users')
      .find((u) => u.id === id)
      .value();
  }
  getTweetById(id: string) {
    return this.db
      .get('tweets')
      .find((t) => t.id === id)
      .value();
  }
  getUserTweets(userId: string) {
    return this.db
      .get('tweets')
      .filter((t) => t.userId === userId)
      .value();
  }
  getUserFavorites(userId: string) {
    return this.db
      .get('favorites')
      .filter((f) => f.userId === userId)
      .value();
  }

  getAllTweets(): DbTweet[] {
    return this.db
      .get('tweets')
      .sortBy((t) => new Date(t.createdAt).valueOf())
      .reverse()
      .value();
  }

  getAllFavorites(): DbFavorite[] {
    return this.db.get('favorites').value();
  }

  getAllTrends(): DbTrend[] {
    const hashTrends = this.db.get('hashtagTrends').reverse().value();
    const topicTrends = this.db.get('topicTrends').reverse().value();
    const topicTrendQuotes = this.db
      .get('topicTrendQuotes')
      .reverse()
      .value()
      .reduce((acc, item) => {
        acc[item.topicTrendId] = item;
        return acc;
      }, {} as Record<string, DbTopicTrendQuote>);

    const list = [
      ...hashTrends,
      ...topicTrends.map((tt) => {
        const quote = topicTrendQuotes[tt.id];
        return { ...tt, quote };
      }),
    ].sort((a, b) => b.tweetCount - a.tweetCount);
    return list;
  }

  getAllSuggestions() {
    return this.db.get('suggestions').value();
  }

  getFavoritesForTweet(tweetId: string): DbFavorite[] {
    return this.db
      .get('favorites')
      .filter((t) => t.tweetId === tweetId)
      .value();
  }
  getFavoriteCountForTweet(tweetId: string): number {
    return this.getFavoritesForTweet(tweetId).length;
  }
  async createSuggestion(
    trendProps: Pick<DbSuggestion, 'avatarUrl' | 'handle' | 'name' | 'reason'>
  ): Promise<DbSuggestion> {
    const suggestions = this.db.get('suggestions');
    const newSuggestion: DbSuggestion = {
      ...trendProps,
      id: `suggestion-${uuid()}`,
    };
    await suggestions.push(newSuggestion).write();
    return newSuggestion;
  }
  async createHashtagTrend(
    trendProps: Pick<DbHashtagTrend, 'tweetCount' | 'hashtag'>
  ): Promise<DbHashtagTrend> {
    const hashtagTrends = this.db.get('hashtagTrends');
    const newTrend: DbHashtagTrend = {
      ...trendProps,
      kind: 'hashtag',
      id: `hashtrend-${uuid()}`,
    };
    await hashtagTrends.push(newTrend).write();
    return newTrend;
  }
  async createTopicTrend(
    trendProps: Pick<DbTopicTrend, 'topic' | 'tweetCount'>,
    quoteProps?: Pick<DbTopicTrendQuote, 'title' | 'imageUrl' | 'description'>
  ): Promise<DbTopicTrend> {
    const topicTrends = this.db.get('topicTrends');
    const newTrend: DbTopicTrend = {
      ...trendProps,
      kind: 'topic',
      id: `topictrend-${uuid()}`,
    };
    await topicTrends.push(newTrend).write();
    if (quoteProps) {
      const { title, description, imageUrl } = quoteProps;
      const topicTrendQuotes = this.db.get('topicTrendQuotes');
      const newQuote: DbTopicTrendQuote = {
        ...trendProps,
        title,
        description,
        imageUrl,
        topicTrendId: newTrend.id,
        id: `topictrendquote-${uuid()}`,
      };
      await topicTrendQuotes.push(newQuote).write();
    }
    return newTrend;
  }

  async createTweet(
    tweetProps: Pick<DbTweet, 'message' | 'userId'>
  ): Promise<DbTweet> {
    const tweets = this.db.get('tweets');
    const tweet: DbTweet = {
      ...tweetProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `tweet-${uuid()}`,
    };
    await tweets.push(tweet).write();
    return tweet;
  }

  async createUser(
    userProps: Pick<DbUser, 'name' | 'handle' | 'avatarUrl' | 'coverUrl'>
  ): Promise<DbUser> {
    const users = this.db.get('users');
    const user: DbUser = {
      ...userProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `user-${uuid()}`,
    };
    await users.push(user).write();
    return user;
  }

  async createFavorite(
    favoriteProps: Pick<DbFavorite, 'tweetId' | 'userId'>
  ): Promise<DbFavorite> {
    const user = this.getUserById(favoriteProps.userId);
    const tweet = this.getTweetById(favoriteProps.tweetId);
    if (!user) throw new Error('User does not exist');
    if (!tweet) throw new Error('Tweet does not exist');
    const favorites = this.db.get('favorites');
    const favorite: DbFavorite = {
      ...favoriteProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `favorite-${uuid()}`,
    };
    await favorites.push(favorite).write();
    return favorite;
  }
  async deleteFavorite(
    favoriteProps: Pick<DbFavorite, 'tweetId' | 'userId'>
  ): Promise<DbFavorite> {
    const user = this.getUserById(favoriteProps.userId);
    const tweet = this.getTweetById(favoriteProps.tweetId);
    if (!user) throw new Error('User does not exist');
    if (!tweet) throw new Error('Tweet does not exist');
    const favorites = this.db.get('favorites');

    const deleted = favorites.remove(
      (f) => f.tweetId === tweet.id && f.userId === user.id
    );

    await this.db.write();
    return deleted.first().value();
  }

  hasUser(predicate: (user: DbUser) => boolean): boolean {
    return !!this.db.get('users').find(predicate);
  }

  getAllUsers(): DbUser[] {
    return this.db.get('users').value();
  }

  async write(): Promise<void> {
    await this.db.write();
  }
}

export default Db;
