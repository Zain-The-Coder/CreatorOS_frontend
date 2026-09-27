import React from 'react';
import './LoginBrandPanel.css';

export default function LoginBrandPanel() {
  return (
    <div className="login-brand">
      <div className="login-brand__header">
        <div className="login-brand__logo-box">
          <span className="login-brand__logo-icon">▶</span>
        </div>
        <div className="login-brand__logo-text">
          <span className="login-brand__logo-title">CreatorOS</span>
          <span className="login-brand__logo-subtitle">STUDIO SUITE BROADCAST DESK</span>
        </div>
      </div>

      <div className="login-brand__hero-text">
        <h1 className="login-brand__title">
          Welcome back to your <span className="login-brand__title-highlight">studio.</span>
        </h1>
        <p className="login-brand__desc">
          Pick up right where your last upload left off. Real-time metrics, automated sponsor pipelines, and workflow sync ready to go.
        </p>
      </div>

      <div className="login-brand__visual">
        <div className="login-brand__visual-bg-glow"></div>
        <div className="login-brand__visual-content">
          <div className="login-brand__stats-top">
            <div className="login-brand__stat-card">
              <div className="login-brand__stat-icon login-brand__stat-icon--red">▶</div>
              <div>
                <div className="login-brand__stat-label">
                  Channel Views <span className="login-brand__stat-trend">↑ 42%</span>
                </div>
                <div className="login-brand__stat-value">+348.6K</div>
              </div>
            </div>
            <div className="login-brand__live-badge">
              <span className="login-brand__live-dot"></span> Live Synced
            </div>
          </div>

          <div className="login-brand__chart">
            <svg className="login-brand__chart-svg" fill="none" viewBox="0 0 360 80">
              <defs>
                <linearGradient id="areaWarmGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fd933d" stopOpacity="0.35"></stop>
                  <stop offset="100%" stopColor="#fd933d" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <path d="M 0 55 C 45 54, 75 52, 110 44 C 145 36, 175 14, 210 22 C 250 31, 280 20, 310 12 C 335 5, 350 7, 360 6 L 360 80 L 0 80 Z" fill="url(#areaWarmGrad)"></path>
              <path d="M 0 55 C 45 54, 75 52, 110 44 C 145 36, 175 14, 210 22 C 250 31, 280 20, 310 12 C 335 5, 350 7, 360 6" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="3"></path>
              <circle cx="150" cy="27" fill="#FFFFFF" r="4.5" stroke="#b61722" strokeWidth="2.5"></circle>
              <circle cx="260" cy="24" fill="#FFFFFF" r="4.5" stroke="#fd933d" strokeWidth="2.5"></circle>
            </svg>
          </div>

          <div className="login-brand__stats-bottom">
            <div className="login-brand__stat-card">
              <div className="login-brand__stat-icon login-brand__stat-icon--orange">📊</div>
              <div>
                <div className="login-brand__stat-label">Subscriber Run-rate</div>
                <div className="login-brand__stat-value">128.4K <span className="login-brand__stat-unit">subs/mo</span></div>
              </div>
            </div>
          </div>
          
          <div className="login-brand__micro-metrics">
             <div className="login-brand__micro-item">
               <span>🔄</span> API sync: 0.4s lag
             </div>
             <div className="login-brand__micro-item login-brand__micro-item--orange">
               <span>📈</span> 4.2x Deal Velocity
             </div>
          </div>
        </div>
      </div>

      <div className="login-brand__social-proof">
        <div className="login-brand__avatars">
          <div className="login-brand__avatar">MK</div>
          <div className="login-brand__avatar login-brand__avatar--al">AL</div>
          <div className="login-brand__avatar login-brand__avatar--vs">VS</div>
          <div className="login-brand__avatar-count">+14k</div>
        </div>
        <div className="login-brand__rating">
          <div className="login-brand__stars">★★★★★ <span className="login-brand__rating-score">4.9 / 5.0</span></div>
          <p className="login-brand__rating-text">Trusted by 14,000+ creator studios worldwide</p>
        </div>
      </div>
    </div>
  );
}
