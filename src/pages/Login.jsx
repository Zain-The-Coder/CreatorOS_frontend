import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import LoginBrandPanel from '../components/auth/LoginBrandPanel';
import LoginForm from '../components/auth/LoginForm';
import TelemetryTiles from '../components/auth/TelemetryTiles';

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLoginSubmit = async (data) => {
    setErrorMsg('');
    const result = await login(data.email, data.password);
    if (result.success) {
      localStorage.removeItem('isGoogleLogin');
      navigate('/dashboard');
    } else {
      setErrorMsg(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="page-login">
      <AuthLayout 
        badgeText="⚡ STUDIO WORKSPACE v2.4 ONLINE"
        brandPanel={<LoginBrandPanel />}
        bottomContent={<TelemetryTiles />}
      >
        <LoginForm onSubmit={handleLoginSubmit} error={errorMsg} />
      </AuthLayout>
    </div>
  );
}
