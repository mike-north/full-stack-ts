import {
  faImage,
  faFilm,
  faChartBar,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

const ComposePanel: React.FC = () => {
  return (
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
  );
};
export default ComposePanel;
