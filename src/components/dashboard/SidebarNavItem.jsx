import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarNavItem.css';

const SidebarNavItem = ({ icon, label, isActive, href, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <Link to={href || '#'} className={`nav-item ${isActive ? 'nav-item--active' : ''}`} onClick={handleClick}>
      <span className="material-symbols-outlined nav-item__icon">{icon}</span>
      <span className="nav-item__label">{label}</span>
    </Link>
  );
};

export default SidebarNavItem;
