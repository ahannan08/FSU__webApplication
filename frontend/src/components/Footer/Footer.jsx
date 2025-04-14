import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/roster">Team Roster</a>
          <a href="/calender">Schedule</a>
          <a href="/about">About</a>
        </div>
        <div className="copyright">
          © 2025 Florida State University Athletics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;