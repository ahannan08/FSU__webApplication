import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Wrap the logo with a Link to navigate to "/" */}
        <Link to="/" className="logo">
          FSU
        </Link>
        <div className="site-title">
          {/* Wrap the site title with a Link to navigate to "/" */}
          <Link to="/" className="site-title-link">
            <h1>Florida State Football</h1>
            <p>Player Stats Dashboard</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
