export interface User {
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface DetailedUser extends User {
  coverUrl: string;
  followerCount: number;
  tweetCount: number;
  followingCount: number;
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
