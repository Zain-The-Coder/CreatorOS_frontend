import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, loginAPI, registerAPI, logoutAPI } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await getCurrentUser();
      if (data && data.status === 200 && data.userDetails) {
        setUser(data.userDetails);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginAPI(email, password);
      if (data && data.user) {
         setUser(data.user);
      } else {
         setUser(data.userDetails || data);
      }
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (formData) => {
    try {
      const data = await registerAPI(formData);
      if (data && data.user) {
         setUser(data.user);
      } else {
         setUser(data.userDetails || data);
      }
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout API failed, but clearing local state.', error);
    } finally {
      localStorage.removeItem('isGoogleLogin');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
