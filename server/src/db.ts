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
}

export interface DbFavorite extends DbEntity {
  tweetId: string;
  userId: string;
}

export interface DbSchema {
  tweets: DbTweet[];
  users: DbUser[];
  favorites: DbFavorite[];
}

class Db {
  private adapter;
  private db;

  constructor(filePath: string) {
    this.adapter = new FileSync<DbSchema>(filePath);
    this.db = low(this.adapter);
    this.db.read();
    this.db.defaults({ tweets: [], users: [], favorites: [] }).write();
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
    return this.db.get('tweets').value();
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

  createTweet(tweetProps: Pick<DbTweet, 'message' | 'userId'>): DbTweet {
    const tweets = this.db.get('tweets');
    const tweet: DbTweet = {
      ...tweetProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `tweet-${uuid()}`,
    };
    tweets.push(tweet).write();
    return tweet;
  }

  createUser(userProps: Pick<DbUser, 'name' | 'handle' | 'avatarUrl'>): DbUser {
    const users = this.db.get('users');
    let user: DbUser = {
      ...userProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `user-${uuid()}`,
    };
    users.push(user).write();
    return user;
  }

  createFavorite(
    favoriteProps: Pick<DbFavorite, 'tweetId' | 'userId'>
  ): DbFavorite {
    const user = this.getUserById(favoriteProps.userId);
    const tweet = this.getTweetById(favoriteProps.tweetId);
    if (!user) throw new Error('User does not exist');
    if (!tweet) throw new Error('Tweet does not exist');
    const favorites = this.db.get('favorites');
    let favorite: DbFavorite = {
      ...favoriteProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `favorite-${uuid()}`,
    };
    favorites.push(favorite).write();
    return favorite;
  }
  deleteFavorite(favoriteProps: Pick<DbFavorite, 'tweetId' | 'userId'>): DbFavorite {
    const user = this.getUserById(favoriteProps.userId);
    const tweet = this.getTweetById(favoriteProps.tweetId);
    if (!user) throw new Error('User does not exist');
    if (!tweet) throw new Error('Tweet does not exist');
    const favorites = this.db.get('favorites');

    const deleted = favorites.remove(
      (f) => f.tweetId === tweet.id && f.userId === user.id
    );

    this.db.write();
    return deleted.first().value();
  }

  hasUser(predicate: (user: DbUser) => boolean): boolean {
    return !!this.db.get('users').find(predicate);
  }

  getAllUsers(): DbUser[] {
    return this.db.get('users').value();
  }

  write(): void {
    this.db.write();
  }
}

export default Db;
