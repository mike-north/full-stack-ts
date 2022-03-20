import { gql } from '@apollo/client';
import * as React from 'react';
import { useGetCurrentUserQuery } from './generated/graphql';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

// const currentUser: DetailedUser = {
//   name: 'Mike North',
//   handle: 'MichaelLNorth',
//   avatarUrl: 'http://localhost:3000/static/profile-pic.png',
//   coverUrl: 'http://placecorgi.com/1200/300',
//   followerCount: 1237,
//   tweetCount: 15712,
//   followingCount: 124974,
// };

// Source https://codepen.io/Gibbu/pen/dZBBZO

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      handle
      avatarUrl
      createdAt
      updatedAt
      coverUrl
      statistics {
        tweetCount
        followerCount
        followingCount
      }
    }
  }
`;


const App: React.FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data) {
    const { currentUser } = data;
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
  } else return <p>No data.</p>;
};
export default App;
