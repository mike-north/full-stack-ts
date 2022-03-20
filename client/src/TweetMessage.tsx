import * as React from 'react';

const URL_REGEXP = /(https?:\/\/[\w./&?\-_]+)|(\n)/g;
const YOUTUBE_URL_REGEXP = /https:\/\/www.youtube.com[\w./&?\-_]+/g;
const IMAGE_URL_REGEXP = /https?:\/\/[\w./&?\-_]+.(jpg|jpeg|gif|png)/g;

const TweetMessage: React.FC<{ message: string }> = ({ message }) => {
  const parts = message.split(URL_REGEXP).filter(Boolean);
  console.log({ parts })
  return (
    <div className="message">
      {parts.map((part,index) => {
        if (YOUTUBE_URL_REGEXP.test(part)) {
          return (
            <div key={index} className="iframe-container">
              <iframe
                src={part}
                allow="encrypted-media"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          );
        } else if (IMAGE_URL_REGEXP.test(part)) {
          return <img key={index}  src={part} />;
        } else return <p key={index} >{part}</p>;
      })}
    </div>
  );
};

export default TweetMessage;
