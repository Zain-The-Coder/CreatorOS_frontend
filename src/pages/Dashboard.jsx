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

const renderSparkline = (value = 100) => {
  // Generate a smooth upward trending path if value > 0
  const points = [];
  const segments = 10;
  let currentY = 45; // Start near bottom (50 is max height)
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 360;
    points.push(`${i === 0 ? 'M' : 'L'}${x},${currentY}`);
    // Random step, trending upwards (smaller Y)
    currentY = Math.max(5, currentY - (Math.random() * 8)); 
  }
  const pathStr = points.join(' ');
  const areaStr = `${pathStr} L360,50 L0,50 Z`;

  return (
    <div className="stat-card__sparkline" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 50" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.4)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
          </linearGradient>
        </defs>
        <path d={areaStr} fill="url(#sparkGrad)" />
        <path d={pathStr} fill="none" stroke="var(--color-sunset-red)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="360" cy={currentY} r="5" fill="#fff" stroke="var(--color-sunset-red)" strokeWidth="2" />
      </svg>
    </div>
  );
};

const renderBars = (value = 100) => {
  // Generate 14 bars trending upwards
  const bars = [];
  let currentH = 30; // Start at 30% height
  for (let i = 0; i < 14; i++) {
    bars.push(currentH);
    currentH = Math.min(100, currentH + (Math.random() * 15 - 3)); // Trend upwards
  }
  
  // Make sure the last one looks like the current value/highest
  bars[13] = 100;

  return (
    <div className="stat-card__bars">
      {bars.map((h, i) => (
        <div 
          key={i} 
          className={`stat-card__bar ${i === 13 ? 'stat-card__bar--active' : ''}`} 
          style={{ height: `${h}%` }}
        ></div>
      ))}
    </div>
  );
};

const formatDate = (isoStr) => {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [videoData, setVideoData] = useState([]);
  const [stats, setStats] = useState({ views: 0, watchTime: 0 });
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1
  });
  const [isPaginating, setIsPaginating] = useState(false);

  const fetchDashboardData = async (page = 1, isInitialLoad = true) => {
    if (isInitialLoad) {
      setStatus('loading');
    } else {
      setIsPaginating(true);
    }

    try {
      const response = await getMyVideos(page, 30);
      const payload = response.data;
      
      const hasDataObj = payload.data && payload.data.videoDetails;
      const hasVideosObj = payload.videos && payload.videos.videoDetails;

      if (payload.status === 200 && (hasDataObj || hasVideosObj)) {
        const targetObj = hasDataObj ? payload.data : payload.videos;
        const vids = targetObj.videoDetails || [];
        
        // Use backend pagination object if provided, else fallback to standard defaults
        const pageData = payload.pagination || targetObj.pagination || {
          currentPage: page,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: page > 1
        };

        const mappedVideos = vids.map(v => ({
          id: v.videoId,
          title: v.title,
          thumbnail: v.thumbnails?.medium?.url || v.thumbnails?.default?.url || v.thumbnails?.url || '',
          duration: formatDuration(v.duration),
          date: formatDate(v.publishedAt),
          views: formatNumber(v.views),
          likes: formatNumber(v.likes),
          rawViews: Number(String(v.views || '0').replace(/[^0-9.-]+/g, '')) || 0,
          rawLikes: Number(String(v.likes || '0').replace(/[^0-9.-]+/g, '')) || 0,
          rawWatchTime: Number(String(v.watchTime || v.estimatedMinutesWatched || '0').replace(/[^0-9.-]+/g, '')) || 0,
          badge: v.privacyStatus === 'public' ? 'Published' : (v.privacyStatus === 'unlisted' ? 'Unlisted' : 'Private'),
          badgeType: v.privacyStatus === 'public' ? 'primary' : 'tertiary',
        }));
        
        // Always replace videos list when paginating (don't append)
        setVideoData(mappedVideos);
        setCurrentPage(pageData.currentPage || page);
        setPaginationInfo({
          hasNextPage: pageData.hasNextPage,
          hasPrevPage: pageData.hasPrevPage,
          totalPages: pageData.totalPages
        });

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
        
        if (isInitialLoad) {
          setStats({
            watchTime: watchTimeMinutes,
            views: totalViews
          });
          setStatus('success');
        }
      } else {
        if (isInitialLoad) setStatus('error');
        setErrorMessage('Failed to load data');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data?.message?.toLowerCase().includes('connected')) {
        if (isInitialLoad) setStatus('not_connected');
      } else {
        if (isInitialLoad) setStatus('error');
        setErrorMessage(error.response?.data?.message || error.message || 'Network error');
      }
    } finally {
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(1, true);
  }, []);

  const handlePageChange = (newPage) => {
    fetchDashboardData(newPage, false);
  };

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
                  trendText={stats.views > 0 ? "Trending Up" : "Synced"}
                  trendPositive={true}
                  renderVisual={() => renderSparkline(stats.views)}
                />
                <StatCard 
                  variant="secondary"
                  icon="schedule"
                  label="Retention Density"
                  title="Watch Time Hours"
                  value={displayWatchTime}
                  subtext="Total watch hours"
                  trendText={stats.watchTime > 0 ? "Trending Up" : "Synced"}
                  trendPositive={true}
                  renderVisual={() => renderBars(stats.watchTime)}
                />
              </div>

              <VideoList 
                videos={videoData}
                currentPage={currentPage}
                paginationInfo={paginationInfo}
                isPaginating={isPaginating}
                onPageChange={handlePageChange}
              />
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
