import {
  faComment,
  faHeart as faHeartHollow,
} from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisH,
  faRetweet,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import { gql } from '@apollo/client';
import * as React from 'react';
import TweetMessage from './TweetMessage';
import { humanFriendlyNumber } from './utils/number';
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from './generated/graphql';
import { GET_TIMELINE_TWEETS } from './Timeline';
import { GET_CURRENT_USER } from './App';

export interface TweetProps {
  currentUserId: string;
  tweet: {
    id: string;
    isFavorited: boolean;
    message: string;
    createdAt: Date;
    author: {
      name: string;
      handle: string;
      avatarUrl: string;
    };
    favoriteCount: number;
    retweetCount: number;
    commentCount: number;
  };
}

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($tweetId: String!, $userId: String!) {
    createFavorite(tweetId: $tweetId, userId: $userId) {
      tweet {
        id
      }
      user {
        id
      }
    }
  }
`;
export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($tweetId: String!, $userId: String!) {
    deleteFavorite(tweetId: $tweetId, userId: $userId) {
      tweet {
        id
      }
      user {
        id
      }
    }
  }
`;

const Tweet: React.FC<TweetProps> = ({
  tweet: {
    id,
    message,
    createdAt,
    favoriteCount,
    retweetCount,
    commentCount,
    isFavorited,
    author: { name, handle, avatarUrl },
  },
  currentUserId,
}) => {
  const [
    createFavorite,
    { error: createFavoriteError },
  ] = useCreateFavoriteMutation({
    variables: { tweetId: id, userId: currentUserId },
    refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
  });
  const [
    deleteFavorite,
    { error: deleteFavoriteError },
  ] = useDeleteFavoriteMutation({
    variables: { tweetId: id, userId: currentUserId },
    refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
  });

  if (createFavoriteError) {
    return <p>Error creating favorite: {createFavoriteError.message}</p>;
  }
  if (deleteFavoriteError) {
    return <p>Error deleting favorite: {deleteFavoriteError.message}</p>;
  }

  const handleFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (
    evt
  ) => {
    if (isFavorited) deleteFavorite();
    else createFavorite();
  };

  return (
    <div className="tweet">
      <div className="left">
        <img src={avatarUrl} />
      </div>
      <div className="right">
        <div className="info">
          <p>
            {name}
            <span>@{handle}</span>
          </p>
          <time>{formatDistanceToNow(createdAt)} ago</time>
        </div>
        <TweetMessage message={message} />
        <div className="btns">
          <button className="blue">
            <FontAwesomeIcon icon={faComment} />{' '}
            {humanFriendlyNumber(commentCount)}
          </button>
          <button className="green">
            <FontAwesomeIcon icon={faRetweet} />{' '}
            {humanFriendlyNumber(retweetCount)}
          </button>
          <button className="red" onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              icon={isFavorited ? faHeartSolid : faHeartHollow}
            />{' '}
            {humanFriendlyNumber(favoriteCount)}
          </button>
          <button className="blue">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Tweet;
