import React from 'react';
import './AuthLayout.css';

export default function AuthLayout({ brandPanel, children, bottomContent, badgeText }) {
  return (
    <main className="auth-layout">
      {/* Background ambient orbs */}
      <div className="auth-layout__bg-orb auth-layout__bg-orb--top-left" />
      <div className="auth-layout__bg-orb auth-layout__bg-orb--bottom-right" />
      <div className="auth-layout__bg-orb auth-layout__bg-orb--center" />
      
      <div className="auth-layout__container">
        {badgeText && (
          <div className="auth-layout__top-badge-wrapper">
            <div className="auth-layout__top-badge">
              <span className="auth-layout__top-badge-dot"></span>
              {badgeText}
            </div>
            <div className="auth-layout__top-security">
               <span className="auth-layout__security-icon">🔒</span>
               256-bit Creator API Session Encryption Active
            </div>
          </div>
        )}

        <div className="auth-layout__grid">
          <div className="auth-layout__brand-column">
            {brandPanel}
          </div>
          <div className="auth-layout__form-column">
            {children}
          </div>
        </div>

        {bottomContent && (
          <div className="auth-layout__bottom">
            {bottomContent}
          </div>
        )}
      </div>
    </main>
  );
}
