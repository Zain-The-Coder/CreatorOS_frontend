import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import QuickQuestions from '../components/ai/QuickQuestions';
import TrendInsights from '../components/ai/TrendInsights';
import SuggestTopicWizard from '../components/ai/SuggestTopicWizard';
import '../pages/Dashboard.css'; 

export default function AIInsights() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="dashboard-header" style={{ paddingBottom: '0' }}>
            <div className="dashboard-header__info">
              <h1 className="dashboard-header__title">AI Insights</h1>
              <p className="dashboard-header__date" style={{ marginTop: '8px' }}>
                Your intelligent copilot for channel growth.
              </p>
            </div>
          </header>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px', 
            marginTop: '24px' 
          }}>
            <QuickQuestions />
            <TrendInsights />
            <SuggestTopicWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
