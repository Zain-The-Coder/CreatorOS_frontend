import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import VideoList from '../components/dashboard/VideoList';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../api/axiosInstance';

const DUMMY_VIDEOS = [
  // ... (keep 1 dummy video for fallback)
  {
    title: "Connect YouTube to see your videos here",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYBK_gsPXkHBflZdJnn-zgWNonPIhJ6Og2uGUO42h-p4dF7ZK52N49r7c0cK-lMB1LC6ZR7lzQyQ8As039n_ZFBZou9GNaD0z8qIdyn1O4KVVHuYhYB5i9-9LJinEKCf_0tS25ejJFTXWsEK1jb7LN13Oekw3JresFMPkdkK4JS8oEhosQhKJhs4J3cVSZFpL-c1Q807NSTyUaQsWgPt7mM2sMA9SFUEUIQ8_F2KQy1IJzzb91--J8",
    duration: "0:00",
    date: "Today",
    badge: "Placeholder",
    badgeType: "tertiary",
    views: "0",
    likes: "0",
    retention: "0%"
  }
];

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

const formatDuration = (pt) => {
  if (!pt) return '0:00';
  const match = pt.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  const h = (match[1] || '').replace('H', '');
  const m = (match[2] || '').replace('M', '');
  const s = (match[3] || '').replace('S', '');
  const min = h ? parseInt(h) * 60 + parseInt(m || '0') : parseInt(m || '0');
  const sec = parseInt(s || '0').toString().padStart(2, '0');
  return `${min}:${sec}`;
};

const formatDate = (isoStr) => {
  const date = new Date(isoStr);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const Dashboard = () => {
  const { user } = useAuth();
  const [videoData, setVideoData] = useState([]);
  const [stats, setStats] = useState({ views: 0, watchTime: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.profileCompleted) return;
      
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/dashboard/getmyvideos');
        if (response.data && response.data.videos) {
          const vids = response.data.videos.videoDetails || [];
          const mappedVideos = vids.map(v => ({
            id: v.videoId,
            title: v.title,
            thumbnail: v.thumbnails?.url,
            duration: formatDuration(v.duration),
            date: formatDate(v.publishedAt),
            views: formatNumber(v.views || 0),
            likes: formatNumber(v.likes || 0),
            badge: v.privacyStatus === 'public' ? 'Published' : 'Private',
            badgeType: v.privacyStatus === 'public' ? 'primary' : 'tertiary',
          }));
          
          setVideoData(mappedVideos);

          if (response.data.videos.analytics?.rows?.[0]) {
            const row = response.data.videos.analytics.rows[0];
            setStats({
              watchTime: row[0] || 0, // estimatedMinutesWatched
              views: row[2] || 0      // views
            });
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const displayName = user?.youtube?.channelTitle || user?.username || "Creator";
  const displayViews = user?.profileCompleted ? formatNumber(stats.views) : '0';
  const displayWatchTime = user?.profileCompleted ? formatNumber(Math.floor(stats.watchTime / 60)) + ' hrs' : '0 hrs';
  
  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <DashboardHeader 
            name={displayName} 
            date={todayDate} 
          />
          
          <div className="dashboard-stats-grid">
            <StatCard 
              variant="primary"
              icon="visibility"
              label="Broadcast Reach"
              title="Total Views"
              value={displayViews}
              subtext={user?.profileCompleted ? "Total channel views" : "Connect YouTube to see stats"}
              trendText={user?.profileCompleted ? "Synced" : "Pending"}
              trendPositive={user?.profileCompleted}
              renderVisual={renderSparkline}
            />
            <StatCard 
              variant="secondary"
              icon="schedule"
              label="Retention Density"
              title="Watch Time Hours"
              value={displayWatchTime}
              subtext={user?.profileCompleted ? "Total watch hours" : "Connect YouTube to see stats"}
              trendText={user?.profileCompleted ? "Synced" : "Pending"}
              trendPositive={user?.profileCompleted}
              renderVisual={renderBars}
            />
          </div>

          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your content...</div>
          ) : (
            <VideoList videos={user?.profileCompleted && videoData.length > 0 ? videoData : DUMMY_VIDEOS} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
