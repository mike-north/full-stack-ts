import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faBookmark,
  faChartBar,
  faEllipsisH,
  faEnvelope,
  faFilm,
  faHashtag,
  faImage,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';

const App: React.FC = () => {
  return (
    <div>
      <div id="modal">
        <header>
          <h2>Customize your view</h2>
        </header>
        <main>
          <p>Background</p>
          <div className="radio-buttons">
            <label className="light">
              <input
                type="radio"
                checked
                name="background-option"
                data-theme="light"
              />
              <span>Light</span>
              <span className="border"></span>
            </label>
            <label className="dim">
              <input type="radio" name="background-option" data-theme="dim" />
              <span>Dim</span>
              <span className="border"></span>
            </label>
            <label className="dark">
              <input type="radio" name="background-option" data-theme="dark" />
              <span>Dark</span>
              <span className="border"></span>
            </label>
          </div>
          <p>Navigation style</p>
          <div className="radio-buttons">
            <label className="nav-style">
              <input type="radio" name="nav-style" data-nav="opened" />
              <span>Opened</span>
              <span className="border"></span>
            </label>
            <label className="nav-style">
              <input type="radio" checked name="nav-style" data-nav="closed" />
              <span>Closed</span>
              <span className="border"></span>
            </label>
          </div>
        </main>
      </div>
      <div id="modal-overlay"></div>

      <div id="more-popout-overlay"></div>
      <div id="more-popout" className="nav-closed">
        <div className="nav-item">
          <div className="icon-container">
            <img src="https://pbs.twimg.com/profile_images/1153329245248053248/xONN2R7u_400x400.png" />
          </div>
          <div className="nav-text">
            <p>Ian | Gibbu</p>
            <span>@Gibbu_</span>
          </div>
        </div>
        <div className="nav-item">
          <div className="icon-container">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="nav-text">
            <p>Moments</p>
          </div>
        </div>
        <div className="nav-item">
          <div className="icon-container">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="nav-text">
            <p>Twitter ADS</p>
          </div>
        </div>
        <div className="nav-item">
          <div className="icon-container">
            <i className="fas fa-cog"></i>
          </div>
          <div className="nav-text">
            <p>Settings & privacy</p>
          </div>
        </div>
        <div className="nav-item">
          <div className="icon-container">
            <i className="fas fa-question-circle"></i>
          </div>
          <div className="nav-text">
            <p>Help Center</p>
          </div>
        </div>
        <div className="nav-item display">
          <div className="icon-container">
            <i className="fas fa-palette"></i>
          </div>
          <div className="nav-text">
            <p>Display</p>
          </div>
        </div>
        <div className="nav-item logout">
          <div className="icon-container">
            <i className="fas fa-sign-out-alt"></i>
          </div>
          <div className="nav-text">
            <p>Logout</p>
          </div>
        </div>
      </div>

      <nav className="nav-closed">
        <div
          className="nav-item home"
          aria-label="Home"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faTwitter} />
          </div>

          <div className="nav-text">
            <p>Home</p>
          </div>
        </div>
        <div
          className="nav-item"
          aria-label="Explore"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faHashtag} />
          </div>
          <div className="nav-text">
            <p>Explore</p>
          </div>
        </div>
        <div
          className="nav-item"
          aria-label="Notifications"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="nav-text">
            <p>Notifications</p>
          </div>
        </div>
        <div
          className="nav-item"
          aria-label="Messages"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="nav-text">
            <p>Messages</p>
          </div>
        </div>
        <div
          className="nav-item"
          aria-label="Bookmarks"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className="nav-text">
            <p>Bookmarks</p>
          </div>
        </div>
        <div
          className="nav-item"
          aria-label="Profile"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <div className="icon-container">
            <img src="http://localhost:3000/static/profile-pic.png" />
          </div>
          <div className="nav-text">
            <p>Profile</p>
          </div>
        </div>
        <button
          className="nav-item"
          aria-label="More"
          data-balloon-pos="right"
          data-balloon-blunt
        >
          <span className="icon-container">
            <FontAwesomeIcon icon={faEllipsisH} />
          </span>
          <p>More</p>
        </button>
      </nav>

      <header className="nav-closed">
        <div className="wrapper">
          <div className="top">
            <img src="http://localhost:3000/static/profile-pic.png" />
            <div className="user">
              <h2>Ian | Gibbu</h2>
              <p>@Gibbu_</p>
            </div>
          </div>
          <div className="bottom">
            <a href="#">
              <p>Tweets</p>
              <h3>3.6K</h3>
            </a>
            <a href="#">
              <p>Following</p>
              <h3>127</h3>
            </a>
            <a href="#">
              <p>Followers</p>
              <h3>24.3K</h3>
            </a>
          </div>
        </div>
      </header>

      <div id="container" className="wrapper nav-closed">
        <div id="timeline">
          <div className="new-tweet">
            <textarea placeholder="What's happening?"></textarea>
            <div className="btns">
              <div className="btn">
                <button>
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
              <div className="btn">
                <button>
                  <FontAwesomeIcon icon={faFilm} />
                </button>
              </div>
              <div className="btn">
                <button>
                  <FontAwesomeIcon icon={faChartBar} />
                </button>
              </div>
              <div className="btn">
                <button className="blue">
                  <FontAwesomeIcon icon={faComment} />
                </button>
              </div>
            </div>
          </div>
          <div className="tweet">
            <div className="left">
              <img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" />
            </div>
            <div className="right">
              <div className="info">
                <p>
                  Bob Ross<span>@BobRoss</span>
                </p>
                <time>11m</time>
              </div>
              <div className="message">
                <p>Just posting some of my work.</p>
                <img src="https://images.fineartamerica.com/images-medium-large-5/autumns-glow-c-steele.jpg" />
              </div>
              <div className="btns">
                <button className="blue">
                  <FontAwesomeIcon icon={faComment} size="2x" /> 17.0K
                </button>
                <button className="green">
                  <FontAwesomeIcon icon={faRetweet} /> 7.9K
                </button>
                <button className="red">
                  <FontAwesomeIcon icon={faHeart} /> 37.9K
                </button>
                <button className="blue">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </div>
          </div>
          <div className="tweet">
            <div className="left">
              <img src="https://pbs.twimg.com/profile_images/1153329245248053248/xONN2R7u_400x400.png" />
            </div>
            <div className="right">
              <div className="info">
                <p>
                  Ian | Gibbu<span>@Gibbu_</span>
                </p>
                <time>23m</time>
              </div>
              <div className="message">
                <p>This is my third attempt ona redesign for Twitter.</p>
                <p>
                  Typing anything into the search input will display "YouTube"
                  results.
                </p>
                <p>
                  You can also press "More" &gt; "Display" to customize Twitter.
                </p>
              </div>
              <div className="btns">
                <button className="blue">
                  <FontAwesomeIcon icon={faComment} size="2x" /> 17.0K
                </button>
                <button className="green">
                  <FontAwesomeIcon icon={faRetweet} /> 7.9K
                </button>
                <button className="red">
                  <FontAwesomeIcon icon={faHeart} /> 37.9K
                </button>
                <button className="blue">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </div>
          </div>
          <div className="tweet">
            <div className="left">
              <img src="https://www.thesun.co.uk/wp-content/uploads/2016/04/2129070.main_image.jpg?w=620&strip=all" />
            </div>
            <div className="right">
              <div className="info">
                <p>
                  Albus Dumbledore<span>@albusdumb</span>
                </p>
                <time>23m</time>
              </div>
              <div className="message">
                <p>Very impressive work by this young fellow.</p>
                <div className="iframe-container">
                  <iframe
                    src="https://www.youtube.com/embed/MvjQTA81MhY"
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="btns">
                <button className="blue">
                  <FontAwesomeIcon icon={faComment} size="2x" /> 17.0K
                </button>
                <button className="green">
                  <FontAwesomeIcon icon={faRetweet} /> 7.9K
                </button>
                <button className="red">
                  <FontAwesomeIcon icon={faHeart} /> 37.9K
                </button>
                <button className="blue">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </div>
          </div>
          <div className="tweet">
            <div className="left">
              <img src="https://static0.therichestimages.com/wp-content/uploads/Will-Smith.jpeg" />
            </div>
            <div className="right">
              <div className="info">
                <p>
                  Will Smith<span>@WillSmith</span>
                </p>
                <time>23m</time>
              </div>
              <div className="message">
                <p>Still one of my favourite movies.</p>
                <div className="iframe-container">
                  <iframe
                    src="https://www.youtube.com/embed/aoyV49FfjOU"
                    allow="encrypted-media"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
              <div className="btns">
                <button className="blue">
                  <FontAwesomeIcon icon={faComment} size="2x" /> 17.0K
                </button>
                <button className="green">
                  <FontAwesomeIcon icon={faRetweet} /> 7.9K
                </button>
                <button className="red">
                  <FontAwesomeIcon icon={faHeart} /> 37.9K
                </button>
                <button className="blue">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </div>
          </div>
          <footer>
            <i className="fab fa-twitter"></i>
            <button>Load More</button>
          </footer>
        </div>
        <div id="right">
          <div className="search-container">
            <div className="search-input">
              <input
                id="search"
                type="text"
                placeholder="Search Twitter"
                autoComplete="off"
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="search-results">
              <div className="result">
                <p>youtube</p>
              </div>
              <div className="result">
                <p>youtuber dog</p>
              </div>
              <div className="result">
                <p>youtube music</p>
              </div>
              <hr />
              <div className="result">
                <img src="https://pbs.twimg.com/profile_images/1042095789894295552/2xCUFmgU_normal.jpg" />
                <div className="right">
                  <p>YouTube Gaming</p>
                  <span>@YouTubeGaming</span>
                </div>
              </div>
              <div className="result">
                <img src="https://pbs.twimg.com/profile_images/1148327441527689217/1QpS06D6_normal.png" />
                <div className="right">
                  <p>YouTube</p>
                  <span>@YouTube</span>
                </div>
              </div>
              <div className="result">
                <img src="https://pbs.twimg.com/profile_images/1148364735034691585/OVoeKZYC_normal.png" />
                <div className="right">
                  <p>YouTube Creators</p>
                  <span>@YTCreators</span>
                </div>
              </div>
              <div className="result">
                <img src="https://pbs.twimg.com/profile_images/1148267294004600832/Vibmuz25_normal.png" />
                <div className="right">
                  <p>YouTube TV</p>
                  <span>@youtubemusic</span>
                </div>
              </div>
              <div className="result">
                <img src="https://pbs.twimg.com/profile_images/1148296104611635201/VlnAnBaz_normal.jpg" />
                <div className="right">
                  <p>YouTube Music</p>
                  <span>@youtubemusic</span>
                </div>
              </div>
              <hr />
              <div className="result">
                <p>Go to @YouTube</p>
              </div>
            </div>
          </div>
          <section>
            <header>
              <h3>Australia trends</h3>
              <button>
                <i className="fas fa-cog"></i>
              </button>
            </header>
            <main>
              <a href="#" className="trend">
                <div className="trend-num">
                  <span>1 - Trending</span>
                </div>
                <div className="trend">
                  <p>#aflpiesdons</p>
                  <span>4,144 Tweets</span>
                </div>
              </a>
              <a href="#" className="trend">
                <div className="trend-num">
                  <span>2 - Trending</span>
                </div>
                <div className="trend">
                  <p>David Koch</p>
                  <span>89.5K Tweets</span>
                  <div className="quote">
                    <div className="info">
                      <p>In memoriam</p>
                      <span>Billionaire David Koch dies at 79</span>
                    </div>
                    <img src="https://pbs.twimg.com/media/ECp9mlGXYAgB9X5?format=jpg&name=120x120" />
                  </div>
                </div>
              </a>
              <a href="#" className="trend">
                <div className="trend-num">
                  <span>3 - Trending</span>
                </div>
                <div className="trend">
                  <p>#AUSvENG</p>
                  <span>1,845 Tweets</span>
                </div>
              </a>
              <a href="#" className="trend">
                <div className="trend-num">
                  <span>4 - Trending</span>
                </div>
                <div className="trend">
                  <p>#NRLBroncosSouths</p>
                  <span>2,521 Tweets</span>
                </div>
              </a>
              <a href="#" className="trend">
                <div className="trend-num">
                  <span>5 - Trending</span>
                </div>
                <div className="trend">
                  <p>Warner</p>
                  <span>13.3K Tweets</span>
                </div>
              </a>
            </main>
          </section>
          <section>
            <header>
              <h3>Who to follow</h3>
              <a href="#">View All</a>
            </header>
            <main>
              <a href="#">
                <img src="https://pbs.twimg.com/profile_images/1030015093747138562/YGStmPuy_400x400.jpg" />
                <div className="user">
                  <p>
                    DevTips<small>@DevTipsShow</small>
                  </p>
                  <span>Followed by James Bob and Will Smith</span>
                </div>
              </a>
              <a href="#">
                <img src="https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                <div className="user">
                  <p>
                    Alex Walker<small>@AlexWalker13</small>
                  </p>
                  <span>Followed by Will Smith and Bob Ross</span>
                </div>
              </a>
              <a href="#">
                <img src="https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                <div className="user">
                  <p>
                    Tom Riddle<small>@yaboytom_</small>
                  </p>
                  <span>Followed by Harry Potter, Dumbledore...</span>
                </div>
              </a>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};
export default App;
