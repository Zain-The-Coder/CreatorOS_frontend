import React from 'react';
import './GoogleAuthButton.css';

export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    localStorage.setItem('isGoogleLogin', 'true');
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://creatoros-production-a42f.up.railway.app';
    window.location.href = `${baseURL}/auth/google`.replace(/([^:]\/)\/+/g, "$1");
  };

  return (
    <div className="google-auth">
      <button type="button" className="google-auth__button" onClick={handleGoogleLogin}>
        <svg className="google-auth__icon" viewBox="0 0 24 24">
          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" fill="#4285F4"></path>
          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.37 7.36 24 12 24z" fill="#34A853"></path>
          <path d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" fill="#FBBC05"></path>
          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.27 2.63 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" fill="#EA4335"></path>
        </svg>
        Sign in with Google
      </button>
      
      <div className="google-auth__badge">
        <span className="google-auth__badge-icon">▶</span>
        YouTube Access Included • Instant Data Sync
      </div>
    </div>
  );
}
