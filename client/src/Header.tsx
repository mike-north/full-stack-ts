import * as React from 'react';
import { ClientUserStatistics, ClientUser } from './client-types';
import CurrentUserSummary from './CurrentUserSummary';

interface DetailedUser extends ClientUser {
  coverUrl?: string | null;
  stats?: ClientUserStatistics | null;
}

export interface HeaderProps {
  currentUser: DetailedUser;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const { avatarUrl, name, handle, stats, coverUrl } = currentUser;
  const { followerCount = 0, tweetCount = 0, followingCount = 0 } = stats || {};
  const style: React.CSSProperties = coverUrl
    ? { backgroundImage: `url('${coverUrl}')`, backgroundPosition: 'center' }
    : { backgroundColor: '#339' };
  return (
    <header className="nav-closed" style={style}>
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
