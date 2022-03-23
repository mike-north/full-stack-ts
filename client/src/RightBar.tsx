import * as React from 'react';
import { ClientSuggestion, ClientTrend } from './client-types';
import RightBarSearch from './RightBarSearch';
import RightBarTrendingList from './RightBarTrendingList';
import RightBarWhoToFollowList from './RightBarWhoToFollowList';

export interface RightBarProps {
  trends: ClientTrend[];
  suggestions: ClientSuggestion[];
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
