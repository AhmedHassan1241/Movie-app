// ConnectSidebar.jsx
import React from 'react';
import './SidebarRight.css'; // لتحسين المظهر باستخدام CSS

export function ConnectSidebar() {
  return (
    <div className="d-flex mt-in-sm flex-column connect-sidebar rounded-1 fixed-25 static-position-bottom" style={{left:"20px", backgroundColor: "rgb(237 229 229)" }}>
      <h5 className="text-center pb-3 pt-3 mb-0" style={{ color: '#4c0fbd' ,borderBottom:"1px solid #ccc"}}>Connect with us</h5>
      <ul className="nav nav-pills flex-smm-column mb-auto text-center sidebar-nav flex-row-md-lg">
        <li className="nav-item pb-2 px-3 pt-lg-1">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: '#4c0fbd' }}></i> Facebook
          </a>
        </li>
        <li className="nav-item pb-2 px-3">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="bi bi-instagram" style={{ fontSize: '1.5rem', color: '#4c0fbd' }}></i> Instagram
          </a>
        </li>
        <li className="nav-item pb-2 px-3">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="bi bi-linkedin" style={{ fontSize: '1.5rem', color: '#4c0fbd' }}></i> LinkedIn
          </a>
        </li>
        <li className="nav-item pb-3 px-3">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="bi bi-twitter" style={{ fontSize: '1.5rem', color: '#4c0fbd' }}></i> Twitter
          </a>
        </li>
      </ul>
    </div>
  );
}
