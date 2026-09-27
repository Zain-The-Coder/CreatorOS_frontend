import React from 'react';
import './SidebarNavItem.css';

const SidebarNavItem = ({ icon, label, isActive, href, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <a href={href || '#'} className={`nav-item ${isActive ? 'nav-item--active' : ''}`} onClick={handleClick}>
      <span className="material-symbols-outlined nav-item__icon">{icon}</span>
      <span className="nav-item__label">{label}</span>
    </a>
  );
};

export default SidebarNavItem;
