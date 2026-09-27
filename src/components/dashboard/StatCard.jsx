import React from 'react';
import './StatCard.css';

const StatCard = ({ 
  icon, 
  label, 
  title, 
  value, 
  subtext, 
  trendText, 
  trendPositive = true,
  variant = 'primary', // 'primary' or 'secondary'
  renderVisual
}) => {
  return (
    <div className={`stat-card stat-card--${variant} ${trendPositive ? 'stat-card--positive' : 'stat-card--negative'}`}>
      <div className="stat-card__bg-glow"></div>
      
      <div className="stat-card__content">
        <div className="stat-card__header">
          <div className="stat-card__title-group">
            <div className="stat-card__icon-wrapper">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="stat-card__label-container">
              <span className="stat-card__label">{label}</span>
              <h2 className="stat-card__title">{title}</h2>
            </div>
          </div>
          
          <span className="stat-card__trend">
            <span className="material-symbols-outlined stat-card__trend-icon">
              {trendPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trendText}
          </span>
        </div>

        <div>
          <div className="stat-card__body">
            <span className="stat-card__value">{value}</span>
            <span className="stat-card__subtext">{subtext}</span>
          </div>
          
          {renderVisual && (
            <div className="stat-card__visual">
              {renderVisual()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
