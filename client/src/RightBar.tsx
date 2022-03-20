import * as React from 'react';
import RightBarSearch from './RightBarSearch';
import RightBarTrendingList from './RightBarTrendingList';
import RightBarWhoToFollowList from './RightBarWhoToFollowList';

export interface RightBarProps {

}



const RightBar: React.FC = () => (
  <div id="right">
    <RightBarSearch
      render={(result) =>
        typeof result === 'string' ? (
          <div className="result">
            <p>{result}</p>
          </div>
        ) : (
          <div className="result">
            <img src={result.avatarUrl} />
            <div className="right">
              <p>{result.name}</p>
              <span>@{result.handle}</span>
            </div>
          </div>
        )
      }
    />
    <RightBarTrendingList
      trends={[
        {
          hashtag: 'aflpiesdons',
          tweetCount: 4144,
        },
        {
          topic: 'David Koch',
          tweetCount: 89491,
          quote: {
            title: 'In memoriam',
            description: 'Billionaire David Koch dies at 79',
            imageUrl: 'http://placecorgi.com/500/500',
          },
        },
        {
          hashtag: 'AUSvENG',
          tweetCount: 1845,
        },
        {
          hashtag: 'NRLBroncosSouths',
          tweetCount: 2521,
        },
        {
          topic: 'Warner',
          tweetCount: 13314,
        },
      ]}
    />
    <RightBarWhoToFollowList
      suggestions={[
        {
          name: 'DevTips',
          handle: 'DevTipsShow',
          avatarUrl: 'http://placecorgi.com/100/100',
          reason: 'Followed by James Bob and Will Smith',
        },
        {
          name: 'Alex Walker',
          handle: 'AlexWalker13',
          avatarUrl:
            'https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          reason: 'Followed by Will Smith and Bob Ross',
        },
        {
          name: 'Tom Riddle',
          handle: 'yaboytom_',
          avatarUrl:
            'https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          reason: 'Followed by Harry Potter, Dumbledore...',
        },
      ]}
    />
  </div>
);

export default RightBar;
