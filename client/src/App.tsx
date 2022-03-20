import { DetailedUser } from '@full-stack-ts/shared';
import * as React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

const currentUser: DetailedUser = {
  name: 'Mike North',
  handle: 'MichaelLNorth',
  avatarUrl: 'http://localhost:3000/static/profile-pic.png',
  coverUrl: 'http://placecorgi.com/1200/300',
  followerCount: 1237,
  tweetCount: 15712,
  followingCount: 124974,
};

// Source https://codepen.io/Gibbu/pen/dZBBZO
const App: React.FC = () => {
  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline />
        <RightBar />
      </div>
    </div>
  );
};
export default App;
