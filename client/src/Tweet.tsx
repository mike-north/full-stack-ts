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
import * as React from 'react';
import TweetMessage from './TweetMessage';
import { humanFriendlyNumber } from './utils/number';
import { gql } from '@apollo/client';
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
  mutation CreateFavorite($favorite: FavoriteInput!) {
    createFavorite(favorite: $favorite) {
      id
    }
  }
`;
export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($favorite: FavoriteInput!) {
    deleteFavorite(favorite: $favorite) {
      id
    }
  }
`;

const Tweet: React.FC<TweetProps> = ({ tweet, currentUserId }) => {
  const {
    id,
    message,
    createdAt,
    favoriteCount,
    retweetCount,
    commentCount,
    isFavorited,
    author: { name, handle, avatarUrl },
  } = tweet;
  const handleFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (
    _evt
  ) => {
    if (isFavorited)
      deleteFavorite().catch((err) =>
        console.error('error while deleting favorite', err)
      );
    else
      createFavorite().catch((err) =>
        console.error('error while creating favorite', err)
      );
  };

  const [createFavorite, { error: createFavoriteError }] =
    useCreateFavoriteMutation({
      variables: { favorite: { tweetId: id, userId: currentUserId } },
      refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
    });
  const [deleteFavorite, { error: deleteFavoriteError }] =
    useDeleteFavoriteMutation({
      variables: { favorite: { tweetId: id, userId: currentUserId } },
      refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
    });

  if (createFavoriteError) {
    return <p>Error creating favorite: {createFavoriteError.message}</p>;
  }
  if (deleteFavoriteError) {
    return <p>Error deleting favorite: {deleteFavoriteError.message}</p>;
  }

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
