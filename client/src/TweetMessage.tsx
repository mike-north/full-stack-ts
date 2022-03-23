import * as React from 'react';

const URL_REGEXP = /(https?:\/\/[:\w./&?\-_0-9@]+)|(\n)|(@[0-9a-zA-Z_-]+)/g;
const YOUTUBE_URL_REGEXP = /https:\/\/www.youtube.com[\w./&?\-_@]+/g;
const IMAGE_URL_REGEXP = /https?:\/\/[:\w./&?\-_0-9@]+.(jpg|jpeg|gif|png)/g;
// const MENTION_REGEXP = /(@[0-9a-zA-Z_-]+)/g
const TweetMessage: React.FC<{ message: string }> = ({ message }) => {
  const parts = message.split(URL_REGEXP).filter(Boolean);

  return (
    <div className="message">
      {parts.map((part, index) => {
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
          return (
            <img
              style={{ maxHeight: 600, width: 'auto', margin: 'auto' }}
              key={index}
              src={part}
            />
          );
        } else
          return (
            <span key={index}>
              {part[0] === '@' ? (
                <a
                  className="mention"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  {part}
                </a>
              ) : (
                part
              )}
            </span>
          );
      })}
    </div>
  );
};

export default TweetMessage;
