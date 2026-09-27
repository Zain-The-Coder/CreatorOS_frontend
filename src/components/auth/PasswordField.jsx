import React, { useState } from 'react';
import './PasswordField.css';

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  name,
  required,
  showStrengthIndicator = false,
  actionLink = null // Added to support "Forgot password?"
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getStrengthLevel = () => {
    if (!value) return 0;
    if (value.length < 6) return 1;
    if (value.length < 10) return 2;
    return 3;
  };

  const strength = getStrengthLevel();

  return (
    <div className="password-field">
      <div className="password-field__header">
        <label className="password-field__label" htmlFor={name}>
          {label}
        </label>
        {actionLink && <span className="password-field__action">{actionLink}</span>}
        {!actionLink && showStrengthIndicator && strength === 3 && (
          <span className="password-field__strength-text">Strong password</span>
        )}
      </div>

      <div className="password-field__wrapper">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="password-field__input"
          required={required}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={togglePassword}
          aria-label="Toggle password visibility"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {showStrengthIndicator && (
        <div className="password-field__strength-bar-container">
          <div className={`password-field__bar ${strength >= 1 ? 'password-field__bar--red' : ''}`} />
          <div className={`password-field__bar ${strength >= 2 ? 'password-field__bar--orange' : ''}`} />
          <div className={`password-field__bar ${strength >= 3 ? 'password-field__bar--green' : ''}`} />
        </div>
      )}
    </div>
  );
}
