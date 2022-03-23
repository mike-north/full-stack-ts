import * as React from 'react';
import RightBarSearch from './RightBarSearch';
import RightBarTrendingList from './RightBarTrendingList';
import RightBarWhoToFollowList from './RightBarWhoToFollowList';

export interface UIHashTagTrend {
  hashtag: string;
  tweetCount: number;
}
export interface UITopicTrend {
  topic: string;
  tweetCount: number;
  quote?: null | {
    title: string;
    imageUrl: string;
    description: string;
  };
}
export type UITrend = UIHashTagTrend | UITopicTrend;
export interface UISuggestion {
  name: string;
  handle: string;
  avatarUrl: string;
  reason: string;
}
export interface RightBarProps {
  trends: UITrend[];
  suggestions: UISuggestion[];
}

const RightBar: React.FC<RightBarProps> = ({ trends, suggestions }) => (
  <div id="right">
    <RightBarSearch
      render={(result) =>
        typeof result === 'string' ? (
          <div className="result">
            <p>{result}</p>
          </div>
        ) : (
          <div className="result">
            <img src={result.avatarUrl} />
            <div className="right">
              <p>{result.name}</p>
              <span>@{result.handle}</span>
            </div>
          </div>
        )
      }
    />
    <RightBarTrendingList trends={trends} />
    <RightBarWhoToFollowList suggestions={suggestions} />
  </div>
);

export default RightBar;
