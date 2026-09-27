import React from 'react';
import './BrandPanel.css';

export default function BrandPanel() {
  return (
    <section className="brand-panel">
      <div className="brand-panel__content">
        <div className="brand-panel__badge">
          <span className="brand-panel__badge-icon">▶</span>
          <span className="brand-panel__badge-text">Next-Gen Creator OS</span>
        </div>
        
        <h1 className="brand-panel__heading">
          Turn your channel into a <span className="brand-panel__heading-highlight">business.</span>
        </h1>
        
        <p className="brand-panel__description">
          The all-in-one operating suite engineered for high-growth YouTube creators. 
          Manage channel analytics, production pipelines, sponsorship deal flow, and team 
          collaboration in one warm, focused space.
        </p>
      </div>

      <div className="brand-panel__visual">
        <div className="brand-panel__visual-card">
          <div className="brand-panel__floating-badge brand-panel__floating-badge--top">
            <span className="brand-panel__dot"></span>
            Real-time Studio API sync
          </div>
          
          <div className="brand-panel__floating-badge brand-panel__floating-badge--bottom-right">
            <span className="brand-panel__icon">↗</span>
            4.2x Faster Deal Closing
          </div>
          
          <div className="brand-panel__metric-card">
            <p className="brand-panel__metric-label">Channel Run-Rate</p>
            <p className="brand-panel__metric-value">128.4K <span className="brand-panel__metric-sub">subs/mo</span></p>
          </div>
        </div>
      </div>
      
      <div className="brand-panel__footer">
        <div className="brand-panel__avatars">
          <div className="brand-panel__avatar"></div>
          <div className="brand-panel__avatar"></div>
          <div className="brand-panel__avatar"></div>
          <div className="brand-panel__avatar-count">+14k</div>
        </div>
        <div className="brand-panel__rating">
          <div className="brand-panel__stars">★★★★★ <span className="brand-panel__rating-score">4.9 / 5.0</span></div>
          <p className="brand-panel__rating-text">Trusted by leading creator studios worldwide</p>
        </div>
      </div>
    </section>
  );
}
