import * as React from 'react';
import { ClientSuggestion } from './client-types';

export interface RightBarWhoToFollowListProps {
  suggestions: ClientSuggestion[];
}

const RightBarWhoToFollowList: React.FC<RightBarWhoToFollowListProps> = ({
  suggestions,
}) => {
  return (
    <section>
      <header>
        <h3>Who to follow</h3>
        <a href="#" onClick={(e) => e.preventDefault()}>
          View All
        </a>
      </header>
      <main>
        {suggestions.map((suggestion, index) => {
          const { name, handle, avatarUrl, reason } = suggestion;
          return (
            <a href="#" onClick={(e) => e.preventDefault()} key={index}>
              <img src={avatarUrl} />
              <div className="user">
                <p>
                  {name}
                  <b>
                    <small>@{handle}</small>
                  </b>
                </p>
                <span>{reason}</span>
              </div>
            </a>
          );
        })}
      </main>
    </section>
  );
};

export default RightBarWhoToFollowList;
