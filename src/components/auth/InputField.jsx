import React from 'react';
import './InputField.css';

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  badgeText,
  name,
  required
}) {
  return (
    <div className="input-field">
      <div className="input-field__header">
        <label className="input-field__label" htmlFor={name}>
          {label}
        </label>
        {badgeText && (
          <span className="input-field__badge">
            <span className="input-field__badge-icon">✓</span>
            {badgeText}
          </span>
        )}
      </div>
      <div className="input-field__wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field__input"
          required={required}
        />
      </div>
      {helperText && <p className="input-field__helper">{helperText}</p>}
    </div>
  );
}
