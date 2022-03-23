import { isDefined } from '@full-stack-ts/shared';
import * as React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';
import { gql } from '@apollo/client';
import { useGetCurrentUserQuery } from './generated/graphql';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      handle
      avatarUrl
      createdAt
      stats {
        tweetCount
        followingCount
        followerCount
      }
      favorites {
        tweet {
          id
        }
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
  const { currentUser, suggestions = [], trends = [] } = data;
  const { favorites: rawFavorites } = currentUser;

  const filteredTrends = trends.filter(isDefined);
  const favorites = (rawFavorites || []).filter(isDefined)
    .map((f) => f.tweet.id);
    return (
      <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline
          currentUserId={currentUser.id}
          currentUserFavorites={favorites}
        />
        <RightBar trends={filteredTrends} suggestions={suggestions} />
      </div>
    </div>
  );
};
export default App;

