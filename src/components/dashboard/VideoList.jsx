import React, { useState } from 'react';
import './VideoList.css';
import VideoCard from './VideoCard';

const VideoList = ({ videos }) => {
  const [activeTab, setActiveTab] = useState('All Videos');
  
  const tabs = ['All Videos', 'Published', 'Scheduled', 'Live Streams'];

  return (
    <section className="video-list">
      <div className="video-list__header">
        <div className="video-list__controls">
          <h2 className="video-list__title">Your Videos</h2>
          <div className="video-list__tabs">
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`video-list__tab ${activeTab === tab ? 'video-list__tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="video-list__content">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </section>
  );
};

export default VideoList;
