import React from 'react';
import './Divider.css';

export default function Divider({ text }) {
  return (
    <div className="divider">
      <div className="divider__line"></div>
      <span className="divider__text">{text}</span>
    </div>
  );
}
