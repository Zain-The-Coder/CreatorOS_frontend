import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import '../pages/Dashboard.css';
import './VideoAnalytics.css';
import useAuth from '../hooks/useAuth';
import { getSingleVideo } from '../api/youtube.api';
import { formatNumber } from '../utils/formatNumber';
import { formatDuration } from '../utils/formatDuration';

export default function VideoAnalytics() {
  const { videoId } = useParams();
  const { user } = useAuth();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [videoData, setVideoData] = useState(null);
  
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchVideoData = async () => {
    setStatus('loading');
    try {
      const response = await getSingleVideo(videoId);
      const payload = response.data;
      
      if (payload.status === 200) {
        let data = payload;
        if (payload.data) {
          data = payload.data;
        } else if (payload.videos && payload.videos.videoDetails) {
          data = Array.isArray(payload.videos.videoDetails) ? payload.videos.videoDetails[0] : payload.videos.videoDetails;
        } else if (payload.videoDetails) {
          data = Array.isArray(payload.videoDetails) ? payload.videoDetails[0] : payload.videoDetails;
        } else if (payload.video) {
          data = payload.video;
        }
        
        if (data && data.videoId) {
          setVideoData(data);
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage('Video details not found in response');
        }
      } else {
        setStatus('error');
        setErrorMessage(payload.message || 'Video not found');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to load video');
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  if (status === 'loading') {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton-pulse" style={{ width: '100%', height: '400px', background: 'var(--color-surface-container)', borderRadius: 'var(--radius-xl)' }}></div>
        </main>
      </div>
    );
  }

  if (status === 'error' || !videoData) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-surface-glass)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
             <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>error</span>
             <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '24px', marginBottom: '1rem' }}>Something went wrong</h2>
             <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{errorMessage}</p>
             <Link to="/dashboard" style={{ background: 'var(--color-surface)', color: 'var(--color-text-main)', padding: '10px 24px', borderRadius: '99px', border: '1px solid var(--color-border)', textDecoration: 'none', fontWeight: 600 }}>Back to Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  const title = videoData.title || 'Untitled Video';
  const description = videoData.description || 'No description available.';
  const thumbnail = videoData.thumbnails?.maxres?.url || videoData.thumbnails?.high?.url || videoData.thumbnails?.default?.url || '';
  const duration = formatDuration(videoData.duration);
  const views = formatNumber(videoData.views);
  const likes = formatNumber(videoData.likes);
  const comments = formatNumber(videoData.comments);
  // Watch time not available per video from basic YouTube API right now
  const watchTimeHours = "N/A"; 

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-content video-analytics">
          
          <div className="video-analytics__header">
            <Link to="/dashboard" className="video-analytics__back-btn">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back to Dashboard</span>
            </Link>
            <div className="video-analytics__record-info">
              <span>Telemetry Record</span>
              <span className="video-analytics__record-id">{videoId || 'VID-2025-08XQ'}</span>
            </div>
          </div>

          <section className="video-analytics__hero">
            <div className="video-analytics__thumbnail-wrapper">
              <img 
                className="video-analytics__thumbnail" 
                src={thumbnail} 
                alt={title} 
              />
              <span className="video-analytics__badge-top">4K ULTRA HD</span>
              <span className="video-analytics__badge-bottom">{duration}</span>
            </div>
            
            <div className="video-analytics__info">
              <h1 className="video-analytics__title">
                {title}
              </h1>
              <div>
                <p className={`video-analytics__desc ${!isDescExpanded ? 'video-analytics__desc--collapsed' : ''}`}>
                  {description}
                </p>
                <button 
                  onClick={() => setIsDescExpanded(!isDescExpanded)} 
                  className="video-analytics__toggle-btn"
                >
                  <span>{isDescExpanded ? 'Show less' : 'Show more'}</span>
                  <span className="material-symbols-outlined">{isDescExpanded ? 'expand_less' : 'expand_more'}</span>
                </button>
              </div>
            </div>
          </section>

          <section className="video-analytics__metrics">
            <article className="video-analytics__metric-card">
              <span className="video-analytics__metric-label">Total Views</span>
              <p className="video-analytics__metric-value">{views}</p>
            </article>
            <article className="video-analytics__metric-card">
              <span className="video-analytics__metric-label">Total Likes</span>
              <p className="video-analytics__metric-value">{likes}</p>
            </article>
            <article className="video-analytics__metric-card">
              <span className="video-analytics__metric-label">Discussions</span>
              <p className="video-analytics__metric-value">{comments}</p>
            </article>
            <article className="video-analytics__metric-card">
              <span className="video-analytics__metric-label">Total Watch Time</span>
              <p className="video-analytics__metric-value">
                {watchTimeHours} <span className="video-analytics__metric-unit"></span>
              </p>
            </article>
          </section>

        </div>
      </main>
    </div>
  );
}
