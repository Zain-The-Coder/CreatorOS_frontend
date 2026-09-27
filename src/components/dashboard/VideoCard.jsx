import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ id, thumbnail, duration, title, views, likes, retention, date, badge, badgeType }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if they clicked the analytics button explicitly, 
    // although the whole card goes to the same place now.
    if (id) {
      navigate(`/dashboard/video/${id}`);
    }
  };

  return (
    <article className="video-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="video-card__main">
        <div className="video-card__thumbnail-wrapper">
          <img src={thumbnail} alt={title} className="video-card__thumbnail" />
          <span className="video-card__duration">{duration}</span>
        </div>
        
        <div className="video-card__info">
          <div className="video-card__meta-top">
            {badge && (
              <span className={`video-card__badge video-card__badge--${badgeType || 'primary'}`}>
                {badge}
              </span>
            )}
            <span className="video-card__date">{date}</span>
          </div>
          
          <h3 className="video-card__title" title={title}>
            {title.length > 40 ? title.substring(0, 40) + '...' : title}
          </h3>
          
          <div className="video-card__stats">
            <span className="video-card__stat-item">
              <span className="material-symbols-outlined video-card__stat-icon">visibility</span>
              {views} views
            </span>
            <span className="video-card__stat-item">
              <span className="material-symbols-outlined video-card__stat-icon">thumb_up</span>
              {likes} likes
            </span>
            {retention && (
              <span className="video-card__stat-item video-card__stat-item--highlight">
                <span className="material-symbols-outlined video-card__stat-icon">timer</span>
                {retention} Retention
              </span>
            )}
          </div>
        </div>
      </div>
      
      {id && (
        <div className="video-card__actions">
          <button className="video-card__action-btn" title="Video Analytics">
            <span className="material-symbols-outlined">analytics</span>
          </button>
        </div>
      )}
    </article>
  );
};

export default VideoCard;
