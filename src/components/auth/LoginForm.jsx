import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import PasswordField from './PasswordField';
import PrimaryButton from './PrimaryButton';
import Divider from './Divider';
import GoogleAuthButton from './GoogleAuthButton';
import QuickReturnChip from './QuickReturnChip';
import CheckboxField from './CheckboxField';
import './LoginForm.css';

export default function LoginForm({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberDevice: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAutofill = () => {
    setFormData({
      email: 'creatoros@gmail.com',
      password: 'creatoros',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="login-form__container">
      <div className="login-form__top-bar"></div>
      
      <div className="login-form__header">
        <h2 className="login-form__title">Welcome back</h2>
        <p className="login-form__subtitle">Log in to your creator studio in seconds.</p>
      </div>

      {error && <div className="login-form__error" style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

      <QuickReturnChip onAutofill={handleAutofill} />

      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          label="Creator Email"
          name="email"
          type="email"
          placeholder="you@channelstudio.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <PasswordField
          label="Password"
          name="password"
          placeholder="••••••••••••"
          value={formData.password}
          onChange={handleChange}
          actionLink={<Link to="/forgot-password">Forgot password?</Link>}
          required
        />

        <CheckboxField
          label="Remember this device for 30 days"
          name="rememberDevice"
          checked={formData.rememberDevice}
          onChange={handleChange}
        />

        <PrimaryButton type="submit">Log In</PrimaryButton>

        <Divider text="OR CONTINUE WITH" />

        <GoogleAuthButton />

        <div className="login-form__footer">
          <p className="login-form__signup-text">
            Don't have an account yet?{' '}
            <Link to="/register" className="login-form__signup-link">
              Sign up for CreatorOS
            </Link>
          </p>
          <div className="login-form__security-note">
            <span className="login-form__shield-icon">🛡️</span>
            Protected by CreatorOS Studio Security & YouTube API Services.
          </div>
        </div>
      </form>
    </div>
  );
}
