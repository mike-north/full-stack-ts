import {
  faImage,
  faFilm,
  faChartBar,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { gql } from '@apollo/client';
import { useCreateNewTweetMutation } from './generated/graphql';
import { GET_TIMELINE_TWEETS } from './Timeline';
import { GET_CURRENT_USER } from './App';

export interface ComposePanelProps {
  currentUser: { id: string };
}

export const CREATE_NEW_TWEET = gql`
  mutation CreateNewTweet($userId: String!, $body: String!) {
    createTweet(userId: $userId, body: $body) {
      id
    }
  }
`;

const ComposePanel: React.FC<ComposePanelProps> = ({ currentUser }) => {
  const [createNewTweet, { error }] = useCreateNewTweetMutation();
  if (error) return <p>Error creating tweet ${error}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget.querySelector('textarea');
    if (!textarea) throw new Error('No textarea found');
    const body = textarea.value;
    createNewTweet({
      variables: { userId: currentUser.id, body },
      refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER]
    })
      .then(() => {
        textarea.value = '';
      })
      .catch((err: unknown) => {
        console.error(`Problem creating new tweet`, err);
      });
  };
  return (
    <div className="new-tweet">
      <form onSubmit={handleSubmit}>
        <textarea name="body" placeholder="What's happening?"></textarea>
        <div className="btns">
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faFilm} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faChartBar} />
            </button>
          </div>
          <div className="btn">
            <button type="submit" className="blue">
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ComposePanel;
