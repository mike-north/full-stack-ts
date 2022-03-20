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

export interface DbSchema {
  tweets: DbTweet[];
  users: DbUser[];
}
