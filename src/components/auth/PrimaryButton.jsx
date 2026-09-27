import React from 'react';
import './PrimaryButton.css';

export default function PrimaryButton({ children, type = 'button', onClick }) {
  return (
    <button type={type} className="primary-button" onClick={onClick}>
      <span className="primary-button__text">{children}</span>
      <span className="primary-button__icon">→</span>
    </button>
  );
}
