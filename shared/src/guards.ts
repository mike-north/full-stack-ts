import { HashtagTrend } from './client-types';

export function isHashtagTrend(trend: any): trend is HashtagTrend {
  return typeof trend.hashtag === 'string';
}
