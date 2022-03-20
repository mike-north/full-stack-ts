import * as React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

// Source https://codepen.io/Gibbu/pen/dZBBZO
const App: React.FC = () => {
  return (
    <div>
      <LeftSidebar />

      <Header />

      <div id="container" className="wrapper nav-closed">
        <Timeline />
        <RightBar />
      </div>
    </div>
  );
};
export default App;
