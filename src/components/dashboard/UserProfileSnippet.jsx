import React from 'react';
import './UserProfileSnippet.css';

const UserProfileSnippet = ({ name, handle, role }) => {
  return (
    <div className="user-snippet">
      <div className="user-snippet__info">
        <div className="user-snippet__avatar-wrapper">
          <div className="user-snippet__avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
          <span className="user-snippet__status"></span>
        </div>
        <div className="user-snippet__text">
          <span className="user-snippet__name">{name}</span>
          <span className="user-snippet__handle">{handle}</span>
        </div>
      </div>
      {role && <span className="user-snippet__badge">{role}</span>}
    </div>
  );
};

export default UserProfileSnippet;
