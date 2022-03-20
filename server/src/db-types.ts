export interface DbEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
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

export interface DbSchema {
  tweets: DbTweet[];
  users: DbUser[];
}
