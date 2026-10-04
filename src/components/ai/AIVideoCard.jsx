import React from 'react';
import './AIVideoCard.css';

const AIVideoCard = ({ video }) => {
  const { title, description, video_id, video_published, stats, createdAt } = video;

  // Use YouTube thumbnail URL format if video_id is available
  const thumbnailUrl = video_id 
    ? `https://img.youtube.com/vi/${video_id}/hqdefault.jpg` 
    : 'https://via.placeholder.com/640x360?text=No+Thumbnail';

  const formattedDate = video_published 
    ? new Date(video_published).toLocaleDateString()
    : new Date(createdAt).toLocaleDateString();

  return (
    <div className="ai-video-card">
      <div className="ai-video-card__thumbnail-wrapper">
        <img className="ai-video-card__thumbnail" src={thumbnailUrl} alt={title} />
        <span className="ai-video-card__date-badge">{formattedDate}</span>
      </div>
      
      <div className="ai-video-card__content">
        <h3 className="ai-video-card__title">{title || 'Untitled Video'}</h3>
        <p className="ai-video-card__description">
          {description ? (description.length > 120 ? description.substring(0, 120) + '...' : description) : 'No description available for this video.'}
        </p>
        
        {stats && stats.length > 0 && (
          <div className="ai-video-card__stats">
            <span className="ai-video-card__stat-badge">
              <span className="material-symbols-outlined">analytics</span>
              AI Processed
            </span>
            <span className="ai-video-card__stat-item">
              {stats.length} Data Point(s)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIVideoCard;
