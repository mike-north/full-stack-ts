import { Suggestion } from '@full-stack-ts/shared';
import * as React from 'react';

interface RightBarWhoToFollowListProps {
  suggestions: Suggestion[];
}

const RightBarWhoToFollowList: React.FC<RightBarWhoToFollowListProps> = ({
  suggestions,
}) => {
  return (
    <section>
      <header>
        <h3>Who to follow</h3>
        <a href="#">View All</a>
      </header>
      <main>
        {suggestions.map((suggestion, index) => {
          const { name, handle, avatarUrl, reason } = suggestion;
          return (
            <a href="#" key={index}>
              <img src={avatarUrl} />
              <div className="user">
                <p>
                  {name}
                  <small>@{handle}</small>
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
