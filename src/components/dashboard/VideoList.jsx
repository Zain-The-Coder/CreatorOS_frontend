import React, { useState } from 'react';
import './VideoList.css';
import VideoCard from './VideoCard';

const VideoList = ({ videos }) => {
  const [activeTab, setActiveTab] = useState('All Videos');
  
  const tabs = ['All Videos', 'Published', 'Private', 'Live Streams'];

  const filteredVideos = videos.filter(video => {
    if (activeTab === 'All Videos') return true;
    if (activeTab === 'Published') return video.badge === 'Published';
    if (activeTab === 'Private') return video.badge === 'Private';
    if (activeTab === 'Live Streams') return false; // Not implemented from backend yet
    return true;
  });

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
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <VideoCard key={video.id || index} {...video} />
          ))
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: 'var(--color-text-muted)' }}>
            No videos found for this filter.
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoList;
