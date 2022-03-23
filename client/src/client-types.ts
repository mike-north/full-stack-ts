export interface ClientEntity {
  id: string;
}
export interface ClientUser extends ClientEntity {
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface ClientUserStatistics {
  followerCount: number;
  tweetCount: number;
  followingCount: number;
}

export interface ClientHashtagTrend {
  hashtag: string;
  tweetCount: number;
}
export interface ClientTopicTrend {
  topic: string;
  tweetCount: number;
  quote?: {
    title: string;
    description: string;
    imageUrl: string;
  } | null;
}
export type ClientTrend = ClientHashtagTrend | ClientTopicTrend;

export interface ClientSuggestion {
  name: string;
  handle: string;
  avatarUrl: string;
  reason: string;
}

export interface ClientUserSearchResult {
  name: string;
  handle: string;
  avatarUrl: string;
}
export type ClientSearchResult = string | ClientUserSearchResult;
