import { gql } from '@apollo/client';
import { isDefined } from '@full-stack-ts/shared';
import * as React from 'react';
import { useGetCurrentUserQuery } from './generated/graphql';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

// Source https://codepen.io/Gibbu/pen/dZBBZO

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      favorites {
        tweet {
          id
        }
      }
      id
      name
      handle
      avatarUrl
      createdAt
      updatedAt
      coverUrl
      stats {
        tweetCount
        followerCount
        followingCount
      }
    }
    suggestions {
      name
      handle
      avatarUrl
      reason
    }
    trends {
      ... on TopicTrend {
        tweetCount
        topic
        quote {
          title
          imageUrl
          description
        }
      }
      ... on HashtagTrend {
        tweetCount
        hashtag
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  const { currentUser, trends, suggestions } = data;
  const { favorites: rawFavorites } = currentUser;
  const favorites = (rawFavorites || [])
    .map((f) => f.tweet?.id)
    .filter(isDefined);

  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline
          currentUserId={currentUser.id}
          currentUserFavorites={favorites}
        />
        <RightBar trends={trends || []} suggestions={suggestions || []} />
      </div>
    </div>
  );
};
export default App;
