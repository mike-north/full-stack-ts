import * as React from 'react';

const RightBar: React.FC = () => (
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
);

export default RightBar;
