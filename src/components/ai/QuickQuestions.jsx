import React, { useState, useContext } from 'react';
import { sendAIChat } from '../../api/ai.api';
import { AuthContext } from '../../context/AuthContext';
import './AIWidgets.css';

const QuickQuestions = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendAIChat(userMessage, user?._id);
      console.log(response)
      console.log(response.data)
      const reply = response.data?.answer || 'Could not get a response.';
      setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Error connecting to AI.', sender: 'ai', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-widget-card">
      <div className="ai-widget-card__header">
        <div className="ai-widget-card__icon-wrapper">
          <span className="material-symbols-outlined">forum</span>
        </div>
        <div>
          <h2 className="ai-widget-card__title">Quick Questions</h2>
          <p className="ai-widget-card__subtitle">Ask the AI about your channel</p>
        </div>
      </div>
      
      <div className="ai-chat-window">
        {messages.length === 0 && (
          <div className="ai-chat-window__empty">
            <span className="material-symbols-outlined">waving_hand</span>
            <p>How can I help you today?</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-chat-message ${msg.sender === 'user' ? 'ai-chat-message--user' : 'ai-chat-message--ai'} ${msg.isError ? 'ai-chat-message--error' : ''}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="ai-chat-message ai-chat-message--ai">
            <span className="material-symbols-outlined" style={{ animation: 'pulse 1.5s infinite' }}>more_horiz</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="ai-chat-input-wrapper">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="ai-chat-input"
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading} className="ai-chat-send-btn">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default QuickQuestions;
