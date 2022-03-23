import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faBookmark,
  faEllipsisH,
  faEnvelope,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { ClientUser } from './client-types';

export interface LeftSidebarProps {
  currentUser: ClientUser;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div id="left-overlay-container">
      <div
        id="more-popout-overlay"
        className={isOpen ? 'toggle' : ''}
        onMouseEnter={() => setIsOpen(false)}
      ></div>
      <div id="more-popout" className={isOpen ? 'nav-open' : 'nav-closed'}>
        <div className="nav-item">
          <div className="icon-container">
            <img src={currentUser.avatarUrl} />
          </div>
          <div className="nav-text">
            <p>{currentUser.name}</p>
            <span>@{currentUser.handle}</span>
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
      <nav className="nav-closed" onMouseEnter={() => setIsOpen(true)}>
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
            <img src={currentUser.avatarUrl} />
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
    </div>
  );
};

export default LeftSidebar;
