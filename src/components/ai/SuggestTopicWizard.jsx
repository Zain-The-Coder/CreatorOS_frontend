import React, { useState } from 'react';
import { suggestTopic } from '../../api/ai.api';
import './AIWidgets.css';

const steps = [
  { id: 'category', question: "Which category?", type: 'text', placeholder: 'e.g. Tech, Vlog, Tutorial, Gaming...' },
  { id: 'target_audience', question: "Who's your target audience?", type: 'text', placeholder: 'e.g. Beginners, Teens, Developers...' },
  { id: 'tone', question: "What tone do you want?", type: 'select', options: ['Casual', 'Professional', 'Humorous', 'Educational'] },
  { id: 'goal', question: "What's your goal for this video?", type: 'text', placeholder: 'e.g. grow subscribers, educate audience...' },
];

const SuggestTopicWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ category: '', target_audience: '', tone: 'Casual', goal: '' });
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleChange = (val) => {
    setFormData(prev => ({ ...prev, [steps[currentStep].id]: val }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await suggestTopic(formData);
      if (response.data?.success && response.data?.suggestion) {
        setSuggestion(response.data.suggestion);
      } else {
        setError('Failed to generate a suggestion.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setSuggestion(null);
    setCurrentStep(0);
    setFormData({ category: '', target_audience: '', tone: 'Casual', goal: '' });
    setError(null);
  };

  return (
    <div className="ai-widget-card">
      <div className="ai-widget-card__header">
        <div className="ai-widget-card__icon-wrapper">
          <span className="material-symbols-outlined">lightbulb</span>
        </div>
        <div>
          <h2 className="ai-widget-card__title">Suggest New Topic</h2>
          <p className="ai-widget-card__subtitle">AI-powered video ideation</p>
        </div>
      </div>
      
      <div className="ai-widget-card__body ai-wizard-body">
        {isLoading && (
          <div className="ai-widget-loading-state">
            <span className="material-symbols-outlined" style={{ animation: 'pulse 1.5s infinite', fontSize: '48px', color: 'var(--color-sunset-orange)' }}>neurology</span>
            <p style={{ marginTop: '16px' }}>Generating the perfect idea...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="ai-widget-error-state">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
            <button onClick={handleSubmit} className="ai-widget-retry-btn">Try Again</button>
            <button onClick={handleStartOver} className="ai-widget-secondary-btn" style={{ marginTop: '8px' }}>Start Over</button>
          </div>
        )}

        {suggestion && !isLoading && !error && (
          <div className="ai-wizard-result">
            <h3>Here's your idea:</h3>
            <div className="ai-wizard-suggestion-box">
              {suggestion}
            </div>
            <button onClick={handleStartOver} className="ai-widget-primary-btn" style={{ width: '100%', marginTop: '16px' }}>
              Start Over
            </button>
          </div>
        )}

        {!suggestion && !isLoading && !error && (
          <div className="ai-wizard-step">
            <div className="ai-wizard-progress">
              Step {currentStep + 1} of {steps.length}
            </div>
            <h3 className="ai-wizard-question">{steps[currentStep].question}</h3>
            
            {steps[currentStep].type === 'text' ? (
              <input 
                type="text" 
                className="ai-wizard-input" 
                placeholder={steps[currentStep].placeholder}
                value={formData[steps[currentStep].id]}
                onChange={(e) => handleChange(e.target.value)}
                autoFocus
              />
            ) : (
              <select 
                className="ai-wizard-select"
                value={formData[steps[currentStep].id]}
                onChange={(e) => handleChange(e.target.value)}
              >
                {steps[currentStep].options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            <div className="ai-wizard-controls">
              <button 
                onClick={handleBack} 
                disabled={currentStep === 0}
                className="ai-widget-secondary-btn"
                style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
              >
                Back
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button 
                  onClick={handleNext}
                  disabled={!formData[steps[currentStep].id].trim()}
                  className="ai-widget-primary-btn"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={!formData[steps[currentStep].id].trim()}
                  className="ai-widget-primary-btn"
                >
                  Get Suggestion
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestTopicWizard;
