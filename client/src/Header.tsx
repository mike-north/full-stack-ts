import * as React from 'react';
import CurrentUserSummary from './CurrentUserSummary';

const Header: React.FC = () => (
  <header className="nav-closed">
    <div className="wrapper">
      <div className="top">
        <img src="http://localhost:3000/static/profile-pic.png" />
        <div className="user">
          <h2>Ian | Gibbu</h2>
          <p>@Gibbu_</p>
        </div>
      </div>
      <CurrentUserSummary
        followerCount={24314}
        tweetCount={36144}
        followingCount={127}
      />
    </div>
  </header>
);
export default Header;
