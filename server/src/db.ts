import { JSONFileSync, LowSync } from 'lowdb';
import { DbSchema, DbTweet, DbUser } from './db-types';

class Db {
  private adapter: JSONFileSync<DbSchema>;
  private db: LowSync<DbSchema>;
  private data: DbSchema;

  constructor(filePath: string) {
    this.adapter = new JSONFileSync<DbSchema>(filePath);
    this.db = new LowSync(this.adapter);
    this.db.read();
    this.db.data ||= { tweets: [], users: [] };
    this.data = this.db.data;
  }

  getAllTweets(): DbTweet[] {
    return this.data.tweets;
  }

  createTweet(tweetProps: Pick<DbTweet, 'message' | 'userId'>): DbTweet {
    const tweet: DbTweet = {
      ...tweetProps,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: `tweet-${this.data.tweets.length + 1}`,
    };
    this.data.tweets.push(tweet);
    this.write();
    return tweet;
  }

  createUser(userProps: Pick<DbUser, 'name' | 'handle' | 'avatarUrl'>): DbUser {
    let user: DbUser = {
      ...userProps,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: `user-${this.data.users.length + 1}`,
    };
    this.data.users.push(user);
    this.write();
    return user;
  }

  hasUser(predicate: (user: DbUser) => boolean): boolean {
    return this.data.users.some(predicate);
  }

  getAllUsers(): DbUser[] {
    return this.data.users;
  }

  write(): void {
    this.db.write();
  }
}

export default Db;
