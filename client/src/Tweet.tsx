import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';
import TweetMessage from './TweetMessage';
import { humanFriendlyNumber } from './utils/number';

export interface TweetProps {
  message: string;
  createdAt: Date;
  author: {
    name: string;
    handle: string;
    avatarUrl: string;
  };
  likeCount: number;
  retweetCount: number;
  commentCount: number;
}

const Tweet: React.FC<TweetProps> = ({
  message,
  createdAt,
  likeCount,
  retweetCount,
  commentCount,
  author: { name, handle, avatarUrl },
}) => {
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
            <FontAwesomeIcon icon={faComment} /> {humanFriendlyNumber(commentCount)}
          </button>
          <button className="green">
            <FontAwesomeIcon icon={faRetweet} /> {humanFriendlyNumber(retweetCount)}
          </button>
          <button className="red">
            <FontAwesomeIcon icon={faHeart} /> {humanFriendlyNumber(likeCount)}
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
