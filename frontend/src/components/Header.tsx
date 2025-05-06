import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo">Client Portal</h1>
        <div className="search-profile">
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
          />
          <div className="profile-menu">
            <span className="profile-icon">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
