import React from 'react';
import './QuickReturnChip.css';

export default function QuickReturnChip({ onAutofill }) {
  return (
    <div className="quick-return-chip">
      <div className="quick-return-chip__info">
        <div className="quick-return-chip__avatar">MK</div>
        <div className="quick-return-chip__text-col">
          <span className="quick-return-chip__email">mkbhd@studio.com</span>
          <span className="quick-return-chip__subtitle">Recent Session (Verified Studio)</span>
        </div>
      </div>
      <button 
        type="button" 
        className="quick-return-chip__button"
        onClick={onAutofill}
      >
        Autofill
      </button>
    </div>
  );
}
