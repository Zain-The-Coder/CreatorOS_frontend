import React, { useState, useContext } from 'react';
import { getTrends } from '../../api/ai.api';
import { AuthContext } from '../../context/AuthContext';
import './AIWidgets.css';

const TrendInsights = () => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchTrends = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTrends(user?._id);
      if (response.data?.success && response.data?.insights) {
        setInsights(response.data.insights);
      } else {
        setError('Failed to fetch insights formatting.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInsights = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <ul className="ai-trends-list">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;
          if (trimmed.startsWith('-')) {
            return <li key={idx}>{trimmed.substring(1).trim()}</li>;
          }
          if (trimmed.startsWith('*')) {
            return <li key={idx}>{trimmed.substring(1).trim()}</li>;
          }
          return <li key={idx} style={{ listStyleType: 'none', marginBottom: '8px' }}><strong>{trimmed}</strong></li>;
        })}
      </ul>
    );
  };

  return (
    <div className="ai-widget-card">
      <div className="ai-widget-card__header">
        <div className="ai-widget-card__icon-wrapper">
          <span className="material-symbols-outlined">trending_up</span>
        </div>
        <div>
          <h2 className="ai-widget-card__title">Trend Insights</h2>
          <p className="ai-widget-card__subtitle">Discover what's working best</p>
        </div>
      </div>
      
      <div className="ai-widget-card__body ai-trends-body">
        {!insights && !isLoading && !error && (
          <div className="ai-widget-empty-state">
            <span className="material-symbols-outlined">insights</span>
            <p>Ready to analyze your channel's recent performance trends?</p>
            <button onClick={fetchTrends} className="ai-widget-primary-btn">
              Analyze My Trends
            </button>
          </div>
        )}

        {isLoading && (
          <div className="ai-widget-loading-state">
            <div className="skeleton-pulse" style={{ height: '20px', width: '90%', marginBottom: '12px' }}></div>
            <div className="skeleton-pulse" style={{ height: '20px', width: '70%', marginBottom: '12px' }}></div>
            <div className="skeleton-pulse" style={{ height: '20px', width: '80%', marginBottom: '12px' }}></div>
          </div>
        )}

        {error && (
          <div className="ai-widget-error-state">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
            <button onClick={fetchTrends} className="ai-widget-retry-btn">Try Again</button>
          </div>
        )}

        {insights && !isLoading && (
          <div className="ai-trends-content">
            {renderInsights(insights)}
            <button onClick={fetchTrends} className="ai-widget-secondary-btn" style={{ marginTop: '16px' }}>
              Refresh Insights
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendInsights;
