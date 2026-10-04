import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import AIVideoCard from '../components/ai/AIVideoCard';
import { getAIVideoData } from '../api/ai.api';
import useAuth from '../hooks/useAuth';
import '../pages/Dashboard.css'; // Reusing dashboard layouts

export default function AIInsights() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'empty'
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAIData = async () => {
    setStatus('loading');
    try {
      const response = await getAIVideoData();
      if (response.data?.success && Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          setStatus('empty');
        } else {
          setVideos(response.data.data);
          setStatus('success');
        }
      } else {
        setStatus('error');
        setErrorMessage('Failed to load AI data format.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || error.message || 'An error occurred while fetching AI insights.');
    }
  };

  useEffect(() => {
    fetchAIData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="dashboard-header" style={{ paddingBottom: '0' }}>
            <div className="dashboard-header__info">
              <h1 className="dashboard-header__title">AI Insights</h1>
              <p className="dashboard-header__date" style={{ marginTop: '8px' }}>
                View your AI-processed video analytics and data points.
              </p>
            </div>
          </header>

          {status === 'loading' && (
            <div className="dashboard-videos-loading-grid" style={{ marginTop: '24px' }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="video-card-skeleton" style={{ flexDirection: 'column', height: 'auto' }}>
                  <div className="skeleton-pulse skeleton-thumb" style={{ width: '100%', aspectRatio: '16/9', height: 'auto' }}></div>
                  <div style={{ padding: '8px', width: '100%' }}>
                    <div className="skeleton-pulse skeleton-text" style={{ width: '80%', marginBottom: '8px' }}></div>
                    <div className="skeleton-pulse skeleton-text" style={{ width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-surface-glass)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginTop: '24px' }}>
               <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-sunset-red)', marginBottom: '1rem' }}>error</span>
               <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '24px', marginBottom: '1rem' }}>Something went wrong</h2>
               <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{errorMessage}</p>
               <button 
                 onClick={fetchAIData}
                 style={{ background: 'var(--color-sunset-red)', color: '#fff', padding: '10px 24px', borderRadius: '99px', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
               >
                 <span className="material-symbols-outlined">refresh</span>
                 Try Again
               </button>
            </div>
          )}

          {status === 'empty' && (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-surface-glass)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--color-border)', marginTop: '24px' }}>
               <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>smart_toy</span>
               <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '24px', marginBottom: '1rem' }}>No AI Data Found</h2>
               <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto' }}>We haven't processed any AI insights for your videos yet. Connect your channel and check back later.</p>
            </div>
          )}

          {status === 'success' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)', marginTop: '24px' }}>
              {videos.map(video => (
                <AIVideoCard key={video._id || video.video_id} video={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
