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

const Tweet: React.FC<TweetProps> = ({ tweet, currentUserId }) => {
  const {
    id: _id,
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
    if (isFavorited) console.log('Unfavorite', { tweet, currentUserId });
    else console.log('Favorite', { tweet, currentUserId });
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
