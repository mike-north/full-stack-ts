import * as React from 'react';
import { humanFriendlyNumber } from './utils/number';

export interface CurrentUserSummaryProps {
  tweetCount: number;
  followerCount: number;
  followingCount: number;
}

const CurrentUserSummary: React.FC<CurrentUserSummaryProps> = ({
  tweetCount,
  followerCount,
  followingCount,
}) => (
  <div className="bottom">
    <a href="#">
      <p>Tweets</p>
      <h3>{humanFriendlyNumber(tweetCount)}</h3>
    </a>
    <a href="#">
      <p>Following</p>
      <h3>{humanFriendlyNumber(followingCount)}</h3>
    </a>
    <a href="#">
      <p>Followers</p>
      <h3>{humanFriendlyNumber(followerCount)}</h3>
    </a>
  </div>
);

export default CurrentUserSummary;
