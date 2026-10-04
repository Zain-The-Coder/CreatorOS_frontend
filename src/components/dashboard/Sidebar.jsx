import React from 'react';
import './Sidebar.css';
import SidebarNavItem from './SidebarNavItem';
import UserProfileSnippet from './UserProfileSnippet';
import useAuth from '../../hooks/useAuth';

import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Top Header (only visible on mobile) */}
      <div className="sidebar-mobile-header">
        <div className="sidebar__logo-container sidebar-mobile-header__logo">
          <img 
            src="https://lh3.googleusercontent.com/aida/AEtjO1Xv7EkEd9O6EJSp1CpWez0OTsdsFEBQL6D3b3Eo7vwuniKnEEctA8S95zVsw0IkZuFv8uFHvg8EtEe7j6-viTGzG1eFQHAATlAP_IGspoQ5HYVoLMo1ga3c-gIcsxgUIdFNTw8Ee4pG5uI20Jy4rVzbeON-MOsMrq9N7o6VjqqQcjwuOYN-YpXLgUMmSyMjqLqXgP4qwZQ9pDvQ3lke7yCIlPueel9vAYBdsswGOMwGvVR7xpofhTTcO6o" 
            alt="CreatorOS Logo" 
            className="sidebar__logo" 
          />
          <div className="sidebar__brand">
            <span className="sidebar__brand-title">CreatorOS</span>
          </div>
        </div>
        <div className="sidebar-mobile-header__right">
          <UserProfileSnippet 
            name={user?.youtube?.channelTitle || user?.username || "Creator"} 
            handle={user?.email || "No Email"} 
            role={user?.role?.[0]?.toUpperCase() || "USER"} 
          />
          <button onClick={handleLogout} className="sidebar-mobile-header__logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>

      <aside className="sidebar">
        <div className="sidebar__top">
          <div className="sidebar__logo-container">
            <img 
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xv7EkEd9O6EJSp1CpWez0OTsdsFEBQL6D3b3Eo7vwuniKnEEctA8S95zVsw0IkZuFv8uFHvg8EtEe7j6-viTGzG1eFQHAATlAP_IGspoQ5HYVoLMo1ga3c-gIcsxgUIdFNTw8Ee4pG5uI20Jy4rVzbeON-MOsMrq9N7o6VjqqQcjwuOYN-YpXLgUMmSyMjqLqXgP4qwZQ9pDvQ3lke7yCIlPueel9vAYBdsswGOMwGvVR7xpofhTTcO6o" 
              alt="CreatorOS Logo" 
              className="sidebar__logo" 
            />
            <div className="sidebar__brand">
              <span className="sidebar__brand-title">CreatorOS</span>
              <span className="sidebar__brand-subtitle">Studio Cloud</span>
            </div>
          </div>

          <nav className="sidebar__nav">
            <div className="sidebar__nav-section">
              <span className="sidebar__nav-section-title">Broadcast Ops</span>
            </div>
            <SidebarNavItem 
              icon="grid_view" 
              label="Dashboard" 
              isActive={location.pathname === '/dashboard' || location.pathname === '/'} 
              href="/dashboard" 
            />
            <SidebarNavItem 
              icon="smart_toy" 
              label="AI Insights" 
              isActive={location.pathname === '/ai-insights'} 
              href="/ai-insights" 
            />

            <div className="sidebar__nav-section" style={{ marginTop: '16px' }}>
              <span className="sidebar__nav-section-title">Workspace</span>
            </div>
            <SidebarNavItem icon="logout" label="Log Out" isActive={false} onClick={handleLogout} />
          </nav>
        </div>

        <div className="sidebar__bottom">
          <UserProfileSnippet 
            name={user?.youtube?.channelTitle || user?.username || "Creator"} 
            handle={user?.email || "No Email"} 
            role={user?.role?.[0]?.toUpperCase() || "USER"} 
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
