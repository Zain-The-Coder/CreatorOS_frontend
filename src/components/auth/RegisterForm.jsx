import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import PasswordField from './PasswordField';
import PrimaryButton from './PrimaryButton';
import Divider from './Divider';
import GoogleAuthButton from './GoogleAuthButton';
import { registerAPI } from '../../api/auth.api';
import './RegisterForm.css';

export default function RegisterForm({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="register-form__container">
      <div className="register-form__header">
        <h2 className="register-form__title">Create your CreatorOS account</h2>
        <p className="register-form__subtitle">
          Get started in less than 2 minutes. No credit card required.
        </p>
      </div>

      {error && <div className="register-form__error" style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <InputField
          label="Channel Handle or Username"
          name="username"
          placeholder="e.g. mkbhd, veritasium"
          value={formData.username}
          onChange={handleChange}
          helperText="Min. 3 characters • Will form your creator studio URL"
          required
        />

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
          placeholder="Create a secure password"
          value={formData.password}
          onChange={handleChange}
          showStrengthIndicator={true}
          required
        />

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <PrimaryButton type="submit">Create Account</PrimaryButton>

        <Divider text="or continue with" />

        <GoogleAuthButton />

        <div className="register-form__footer">
          <p className="register-form__login-text">
            Already have an account?{' '}
            <Link to="/login" className="register-form__login-link">
              Log in
            </Link>
          </p>
          <p className="register-form__legal-text">
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Creator Privacy Policy</a>.
          </p>
        </div>
      </form>
    </div>
  );
}
