export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
export interface User extends Entity {
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface UserStatistics {
  followerCount: number;
  tweetCount: number;
  followingCount: number;
}

export interface DetailedUser extends User {
  coverUrl?: string | null;
  statistics: UserStatistics;
}

export interface HashtagTrend {
  hashtag: string;
  tweetCount: number;
}
export interface TopicTrend {
  topic: string;
  tweetCount: number;
  quote?: {
    title: string;
    description: string;
    imageUrl: string;
  };
}
export type Trend = HashtagTrend | TopicTrend;

export interface Suggestion {
  name: string;
  handle: string;
  avatarUrl: string;
  reason: string;
}
export interface RightBarSearchProps {}
export interface UserSearchResult {
  name: string;
  handle: string;
  avatarUrl: string;
}
export type SearchResult = string | UserSearchResult;
