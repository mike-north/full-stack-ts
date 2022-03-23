import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { ClientHashtagTrend, ClientTrend } from './client-types';
import { integerWithCommas } from './utils/number';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHashtagTrend(arg: any): arg is ClientHashtagTrend {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof arg.hashtag === 'string';
}

export interface RightBarTrendingListProps {
  trends: ClientTrend[];
}

const RightBarTrendingList: React.FC<RightBarTrendingListProps> = ({
  trends,
}) => {
  return (
    <section>
      <header>
        <h3>Trends</h3>
        <button>
          <FontAwesomeIcon icon={faCog} />
        </button>
      </header>
      <main>
        {trends.map((trend, index) => {
          return (
            <a
              href="#"
              className="trend"
              key={index}
              onClick={(e) => e.preventDefault()}
            >
              <div className="trend-num">
                <span>{index + 1} - Trending</span>
              </div>
              {isHashtagTrend(trend) ? (
                <div className="trend">
                  <p>#{trend.hashtag}</p>
                  <span>{integerWithCommas(trend.tweetCount)} Tweets</span>
                </div>
              ) : (
                <div className="trend">
                  <p>{trend.topic}</p>
                  <span>{integerWithCommas(trend.tweetCount)} Tweets</span>
                  {trend.quote ? (
                    <div className="quote">
                      <div className="info">
                        <p>{trend.quote.title}</p>
                        <span>{trend.quote.description}</span>
                      </div>
                      <img src={trend.quote.imageUrl} />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </a>
          );
        })}
      </main>
    </section>
  );
};
export default RightBarTrendingList;
