import * as React from 'react';
import ComposePanel from './ComposePanel';
import Tweet from './Tweet';

const Timeline: React.FC = () => (
  <div id="timeline">
    <ComposePanel />
    <Tweet
      author={{name: 'Bob Ross', handle: 'BobRoss', avatarUrl: "https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"}}
      commentCount={17031}
      likeCount={37891}
      retweetCount={7879}
      createdAt={new Date('2022-03-19T23:11:32.960Z')}
      message={`Just posting some of my work. https://images.fineartamerica.com/images-medium-large-5/autumns-glow-c-steele.jpg`}
    />
    <Tweet
      author={{name: 'Ian | Gibbu', handle: 'Gibbu_', avatarUrl: "https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"}}
      commentCount={17031}
      likeCount={37891}
      retweetCount={7879}
      createdAt={new Date('2022-03-19T21:01:32.960Z')}
      message={`This is my third attempt ona redesign for Twitter.
      Typing anything into the search input will display "YouTube"
      results.
      You can also press "More" &gt; "Display" to customize Twitter.`}
    />
    <Tweet
      author={{name: 'Albus Dumbledore', handle: 'albusdumb', avatarUrl: "https://www.thesun.co.uk/wp-content/uploads/2016/04/2129070.main_image.jpg?w=620&strip=all"}}
      commentCount={17031}
      likeCount={37891}
      retweetCount={7879}
      createdAt={new Date('2022-03-19T23:01:32.960Z')}
      message={'Very impressive work by this young fellow. https://www.youtube.com/embed/MvjQTA81MhY'}
    />
    <Tweet
      author={{name: 'Will Smith', handle: 'WillSmith', avatarUrl: "https://static0.therichestimages.com/wp-content/uploads/Will-Smith.jpeg"}}
      commentCount={17031}
      likeCount={37891}
      retweetCount={7879}
      createdAt={new Date('2022-03-19T20:01:32.960Z')}
      message={'Still one of my favourite movies. https://www.youtube.com/embed/aoyV49FfjOU'}
    />

    <footer>
      <i className="fab fa-twitter"></i>
      <button>Load More</button>
    </footer>
  </div>
);

export default Timeline;
