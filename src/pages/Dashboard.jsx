import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './DashboardSkeleton.css';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import VideoList from '../components/dashboard/VideoList';
import useAuth from '../hooks/useAuth';
import { getMyVideos } from '../api/youtube.api';
import { formatNumber } from '../utils/formatNumber';
import { formatDuration } from '../utils/formatDuration';

const renderSparkline = () => (
  <div className="stat-card__sparkline" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    <svg width="100%" height="100%" viewBox="0 0 360 50" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(239, 68, 68, 0.4)" />
          <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
        </linearGradient>
      </defs>
      <path d="M0,45 C25,42 40,25 70,30 C100,35 120,18 150,22 C180,26 210,12 240,16 C270,20 290,4 320,8 C340,10 350,3 360,2 L360,50 L0,50 Z" fill="url(#sparkGrad)" />
      <path d="M0,45 C25,42 40,25 70,30 C100,35 120,18 150,22 C180,26 210,12 240,16 C270,20 290,4 320,8 C340,10 350,3 360,2" fill="none" stroke="var(--color-sunset-red)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="360" cy="2" r="5" fill="#fff" stroke="var(--color-sunset-red)" strokeWidth="2" />
    </svg>
  </div>
);

const renderBars = () => (
  <div className="stat-card__bars">
    {[30, 42, 38, 55, 48, 65, 72, 60, 80, 76, 92, 100, 84, 88].map((h, i) => (
      <div 
        key={i} 
        className={`stat-card__bar ${h === 100 ? 'stat-card__bar--active' : ''}`} 
        style={{ height: `${h}%` }}
      ></div>
    ))}
  </div>
);

const formatDate = (isoStr) => {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [videoData, setVideoData] = useState([]);
  const [stats, setStats] = useState({ views: 0, watchTime: 0 });
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'not_connected', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDashboardData = async () => {
    setStatus('loading');
    try {
      const response = await getMyVideos();
      const payload = response.data;
      
      const hasDataObj = payload.data && payload.data.videoDetails;
      const hasVideosObj = payload.videos && payload.videos.videoDetails;

      if (payload.status === 200 && (hasDataObj || hasVideosObj)) {
        const targetObj = hasDataObj ? payload.data : payload.videos;
        const vids = targetObj.videoDetails || [];
        const mappedVideos = vids.map(v => ({
          id: v.videoId,
          title: v.title,
          thumbnail: v.thumbnails?.medium?.url || v.thumbnails?.default?.url || v.thumbnails?.url || '',
          duration: formatDuration(v.duration),
          date: formatDate(v.publishedAt),
          views: formatNumber(v.views),
          likes: formatNumber(v.likes),
          badge: v.privacyStatus === 'public' ? 'Published' : (v.privacyStatus === 'unlisted' ? 'Unlisted' : 'Private'),
          badgeType: v.privacyStatus === 'public' ? 'primary' : 'tertiary',
        }));
        
        setVideoData(mappedVideos);

        // Sum views from videos for fallback
        let totalViews = vids.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0);
        let watchTimeMinutes = 0;

        if (targetObj.analytics && targetObj.analytics.rows && targetObj.analytics.columnHeaders) {
          const headers = targetObj.analytics.columnHeaders;
          const wtIndex = headers.findIndex(h => h.name === 'estimatedMinutesWatched');
          const viewsIndex = headers.findIndex(h => h.name === 'views');
          const row = targetObj.analytics.rows[0];

          if (row) {
            if (wtIndex !== -1) watchTimeMinutes = row[wtIndex] || 0;
            if (viewsIndex !== -1 && row[viewsIndex]) totalViews = row[viewsIndex];
          }
        }
        
        setStats({
          watchTime: watchTimeMinutes,
          views: totalViews
        });
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Failed to load data');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data?.message?.toLowerCase().includes('connected')) {
        setStatus('not_connected');
      } else {
        setStatus('error');
        setErrorMessage(error.response?.data?.message || error.message || 'Network error');
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const displayName = user?.youtube?.channelTitle || user?.username || "Creator";
  const displayViews = formatNumber(stats.views);
  const displayWatchTime = formatNumber(Math.floor(stats.watchTime / 60)) + ' hrs';
  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const handleConnect = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/auth/google/connect-youtube`;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <DashboardHeader 
            name={displayName} 
            date={todayDate} 
          />
          
          {status === 'loading' && (
            <>
              <div className="dashboard-stats-grid">
                <div className="stat-card-skeleton skeleton-pulse">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton-circle"></div>
                    <div className="skeleton-text" style={{ width: '60px' }}></div>
                  </div>
                  <div className="skeleton-text" style={{ width: '80%', height: '32px', marginTop: 'auto' }}></div>
                </div>
                <div className="stat-card-skeleton skeleton-pulse">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton-circle"></div>
                    <div className="skeleton-text" style={{ width: '60px' }}></div>
                  </div>
                  <div className="skeleton-text" style={{ width: '80%', height: '32px', marginTop: 'auto' }}></div>
                </div>
              </div>
              <div className="dashboard-videos-loading-grid">
                <div className="video-card-skeleton skeleton-pulse">
                  <div className="skeleton-thumb"></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skeleton-text" style={{ width: '40%' }}></div>
                    <div className="skeleton-text" style={{ width: '80%' }}></div>
                    <div className="skeleton-text" style={{ width: '30%', marginTop: 'auto' }}></div>
                  </div>
                </div>
                <div className="video-card-skeleton skeleton-pulse">
                  <div className="skeleton-thumb"></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skeleton-text" style={{ width: '40%' }}></div>
                    <div className="skeleton-text" style={{ width: '80%' }}></div>
                    <div className="skeleton-text" style={{ width: '30%', marginTop: 'auto' }}></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {status === 'not_connected' && (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-surface-glass)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginTop: '2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-sunset-red)', marginBottom: '1rem' }}>link_off</span>
              <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '24px', marginBottom: '1rem' }}>YouTube Not Connected</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Connect your YouTube channel to see your analytics and manage your videos directly from CreatorOS.</p>
              <button 
                onClick={handleConnect}
                style={{ background: 'var(--color-sunset-red)', color: '#fff', padding: '12px 24px', borderRadius: '99px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '16px' }}
              >
                Connect YouTube
              </button>
            </div>
          )}

          {status === 'error' && (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-surface-glass)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginTop: '2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>error</span>
              <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '24px', marginBottom: '1rem' }}>Something went wrong</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{errorMessage}</p>
              <button 
                onClick={fetchDashboardData}
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-main)', padding: '10px 24px', borderRadius: '99px', border: '1px solid var(--color-border)', fontWeight: 600, cursor: 'pointer' }}
              >
                Try Again
              </button>
            </div>
          )}

          {status === 'success' && (
            <>
              <div className="dashboard-stats-grid">
                <StatCard 
                  variant="primary"
                  icon="visibility"
                  label="Broadcast Reach"
                  title="Total Views"
                  value={displayViews}
                  subtext="Total channel views"
                  trendText="Synced"
                  trendPositive={true}
                  renderVisual={renderSparkline}
                />
                <StatCard 
                  variant="secondary"
                  icon="schedule"
                  label="Retention Density"
                  title="Watch Time Hours"
                  value={displayWatchTime}
                  subtext="Total watch hours"
                  trendText="Synced"
                  trendPositive={true}
                  renderVisual={renderBars}
                />
              </div>

              <VideoList videos={videoData} />
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
