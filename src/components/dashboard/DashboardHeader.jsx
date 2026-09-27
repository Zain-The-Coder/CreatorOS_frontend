import React, { useEffect } from 'react';
import './DashboardHeader.css';
import useAuth from '../../hooks/useAuth';

const DashboardHeader = ({ name, date }) => {
  const { user } = useAuth();

  useEffect(() => {
    // Check if backend redirected back with an error
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error === 'email_mismatch') {
      alert('Error: Please select the same Google account that you used to login to CreatorOS.');
      // Remove error from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__info">
        <div className="dashboard-header__status">
          <span className="dashboard-header__status-badge">
            <span className="dashboard-header__pulse"></span>
            Channel Live Synced
          </span>
          <span className="dashboard-header__version">Telemetry v2.4</span>
        </div>
        <h1 className="dashboard-header__title">
          Welcome back, <span className="dashboard-header__name">{name}</span>
        </h1>
        <p className="dashboard-header__date">
          <span>{date}</span>
          <span className="dashboard-header__dot"></span>
          <span>Studio Workspace v2.4</span>
        </p>
      </div>

      <div className="dashboard-header__actions">
        {!user?.profileCompleted && (
          <button 
            className="dashboard-header__btn dashboard-header__btn--secondary"
            onClick={() => {
              const isGoogleLogin = localStorage.getItem('isGoogleLogin') === 'true';
              if (isGoogleLogin) {
                alert('YouTube already connected');
              } else {
                const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
                // Pass the current user's email as a hint to the backend
                const emailQuery = user?.email ? `?email_hint=${encodeURIComponent(user.email)}` : '';
                window.location.href = `${baseURL}/auth/google/connect-youtube${emailQuery}`;
              }
            }}
          >
            <span className="material-symbols-outlined">smart_display</span>
            <span>{localStorage.getItem('isGoogleLogin') === 'true' ? 'YouTube Connected' : 'Connect YouTube'}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
