import React from 'react';
import './CheckboxField.css';

export default function CheckboxField({ label, checked, onChange, name }) {
  return (
    <label className="checkbox-field">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox-field__input"
      />
      <div className="checkbox-field__box">
        <svg className="checkbox-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}
