// components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">FSU</div>
        <div className="site-title">
          <h1>Florida State Football</h1>
          <p>Player Stats Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default Header;