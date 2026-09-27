import React, { useState } from 'react';
import './VideoList.css';
import VideoCard from './VideoCard';

const VideoList = ({ videos, currentPage, paginationInfo, isPaginating, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('All Videos');
  
  const tabs = ['All Videos', 'Most Viewed', 'Most Likes', 'Most Watch Time'];

  const getSortedVideos = () => {
    const vids = [...videos];
    if (activeTab === 'All Videos') return vids;
    if (activeTab === 'Most Viewed') return vids.sort((a, b) => b.rawViews - a.rawViews);
    if (activeTab === 'Most Likes') return vids.sort((a, b) => b.rawLikes - a.rawLikes);
    if (activeTab === 'Most Watch Time') return vids.sort((a, b) => b.rawWatchTime - a.rawWatchTime);
    return vids;
  };

  const filteredVideos = getSortedVideos();

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

      {paginationInfo && (paginationInfo.hasPrevPage || paginationInfo.hasNextPage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-xl)' }}>
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={isPaginating || !paginationInfo.hasPrevPage}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'var(--color-surface-container)',
              border: '1px solid var(--color-border)',
              color: (!paginationInfo.hasPrevPage) ? 'var(--color-text-muted)' : 'var(--color-text-main)',
              fontFamily: 'var(--font-family-display)',
              fontWeight: '600',
              cursor: (isPaginating || !paginationInfo.hasPrevPage) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              opacity: (!paginationInfo.hasPrevPage) ? 0.5 : 1
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
            Previous
          </button>
          
          <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {isPaginating ? 'Loading...' : `Page ${currentPage} of ${paginationInfo.totalPages}`}
          </span>

          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={isPaginating || !paginationInfo.hasNextPage}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'var(--color-surface-container)',
              border: '1px solid var(--color-border)',
              color: (!paginationInfo.hasNextPage) ? 'var(--color-text-muted)' : 'var(--color-text-main)',
              fontFamily: 'var(--font-family-display)',
              fontWeight: '600',
              cursor: (isPaginating || !paginationInfo.hasNextPage) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              opacity: (!paginationInfo.hasNextPage) ? 0.5 : 1
            }}
          >
            Next
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoList;
