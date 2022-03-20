import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { DbSchema, DbTweet, DbUser } from './db-types';

class Db {


  private adapter;
  private db;

  constructor(filePath: string) {
    this.adapter = new FileSync<DbSchema>(filePath);
    this.db = low(this.adapter);
    this.db.read();
    this.db.defaults({ tweets: [], users: [] });
  }

  getFirstUser(): DbUser {
    const firstUser = this.db.get('users').first().value();
    if (!firstUser) throw new Error('No users in database');
    return firstUser;
  }
  getUserTweets(userId: string) {
    return this.db.get('tweets').filter(t => t.userId === userId).value();
  }

  getUserById(id: string): DbUser | undefined {
    return this.db.get('users').find(u => u.id === id).value();
  }
  getTweetById(id: string) {
    return this.db.get('tweets').find(t => t.id === id).value();
  }
  getTweetsByUserId(userId: string) {
    return this.db.get('tweets').filter(t => t.userId === userId).value();
  }


  getAllTweets(): DbTweet[] {
    return this.db.get('tweets').value();
  }

  createTweet(tweetProps: Pick<DbTweet, 'message' | 'userId'>): DbTweet {
    const tweets = this.db.get('tweets');
    const tweet: DbTweet = {
      ...tweetProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `tweet-${tweets.toLength().value() + 1}`,
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
      id: `user-${users.toLength().value() + 1}`,
    };
    users.push(user).write();
    return user;
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
