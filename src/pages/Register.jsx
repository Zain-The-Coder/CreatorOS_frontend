import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import BrandPanel from '../components/auth/BrandPanel';
import RegisterForm from '../components/auth/RegisterForm';
import './Register.css';

export default function Register() {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleRegisterSubmit = async (data) => {
    setErrorMsg('');
    const result = await register(data);
    if (result.success) {
      localStorage.removeItem('isGoogleLogin');
      navigate('/dashboard');
    } else {
      setErrorMsg(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-register">
      <AuthLayout brandPanel={<BrandPanel />}>
        <RegisterForm onSubmit={handleRegisterSubmit} error={errorMsg} />
      </AuthLayout>
    </div>
  );
}
