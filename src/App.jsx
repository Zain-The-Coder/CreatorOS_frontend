import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VideoAnalytics from './pages/VideoAnalytics';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AIInsights from './pages/AIInsights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai-insights" 
          element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/video/:videoId" 
          element={
            <ProtectedRoute>
              <VideoAnalytics />
            </ProtectedRoute>
          } 
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
