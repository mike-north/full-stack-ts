import * as React from 'react';
import ComposePanel from './ComposePanel';
import Tweet from './Tweet';
import { gql } from '@apollo/client';
import { useGetTimelineTweetsQuery } from './generated/graphql';

export interface TimelineProps {
  currentUserId: string;
  currentUserFavorites: string[];
}

export const GET_TIMELINE_TWEETS = gql`
  query GetTimelineTweets {
    tweets {
      id
      body
      stats {
        favoriteCount
        retweetCount
        commentCount
      }
      createdAt
      author {
        name
        handle
        avatarUrl
      }
    }
  }
`;

const Timeline: React.FC<TimelineProps> = ({
  currentUserFavorites,
  currentUserId,
}) => {
  const { loading, error, data } = useGetTimelineTweetsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data!</p>;
  const { tweets } = data;
  if (!tweets) return <p>No tweets!</p>;

  return (
    <div id="timeline">
      <ComposePanel currentUser={{ id: currentUserId }} />
      {tweets.map((t) => {
        const author = t.author;
        if (!author) throw new Error(`Tweet ${t.id} has no author!`);
        const isFavorited = currentUserFavorites.includes(t.id);

        const { stats, id } = t;
        const {
          commentCount = 0,
          favoriteCount = 0,
          retweetCount = 0,
        } = stats || {};
        const tweet = {
          id,
          isFavorited,
          author,
          commentCount,
          favoriteCount,
          retweetCount,
          createdAt: new Date(t.createdAt),
          message: t.body,
        };
        return <Tweet tweet={tweet} currentUserId={currentUserId} key={t.id} />;
      })}

      <footer>
        <i className="fab fa-twitter"></i>
        <button>Load More</button>
      </footer>
    </div>
  );
};

export default Timeline;
