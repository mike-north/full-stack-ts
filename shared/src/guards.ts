import { HashtagTrend } from './client-types';

export function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== 'undefined';
}

export function isPresent<T>(arg: T | undefined | null): arg is T {
  return arg !== null && typeof arg !== 'undefined';
}

export function isHashtagTrend(trend: any): trend is HashtagTrend {
  return typeof trend.hashtag === 'string';
}
