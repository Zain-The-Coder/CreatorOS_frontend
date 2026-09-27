import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ id, thumbnail, duration, title, views, likes, retention, date, badge, badgeType }) => {
  return (
    <article className="video-card">
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
          
          <h3 className="video-card__title" title={title}>{title}</h3>
          
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
          <Link to={`/dashboard/video/${id}`} className="video-card__action-btn" title="Video Analytics">
            <span className="material-symbols-outlined">analytics</span>
          </Link>
        </div>
      )}
    </article>
  );
};

export default VideoCard;
