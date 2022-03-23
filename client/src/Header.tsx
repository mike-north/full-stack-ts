import * as React from 'react';
import CurrentUserSummary from './CurrentUserSummary';
import { DetailedUser } from '@full-stack-ts/shared';

export interface HeaderProps {
  currentUser: DetailedUser;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const { avatarUrl, name, handle, stats, coverUrl } = currentUser;
  const { followerCount = 0, tweetCount = 0, followingCount = 0 } = stats || {};
  const backgroundUrl = coverUrl || 'http://placecorgi.com/1200/300';
  return (
    <header
      className="nav-closed"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="wrapper">
        <div className="top">
          <img src={avatarUrl} />
          <div className="user">
            <h2>{name}</h2>
            <p>@{handle}</p>
          </div>
        </div>
        <CurrentUserSummary
          followerCount={followerCount}
          tweetCount={tweetCount}
          followingCount={followingCount}
        />
      </div>
    </header>
  );
};
export default Header;
