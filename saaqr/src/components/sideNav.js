import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="sidenav">
      <Link to="/dash" className="sidenav-item">
        <i className="fas fa-tachometer-alt"></i> Dashboard
      </Link>
      <Link to="/dash/users" className="sidenav-item">
        <i className="fas fa-users"></i> Users
      </Link>
      <Link to="/dash/events" className="sidenav-item">
        <i className="fas fa-calendar-alt"></i> Events
      </Link>
      <Link to="/dash/profile" className="sidenav-item">
        <i className="fas fa-calendar-alt"></i> Profile
      </Link>
    </div>
  );
};

export default SideNav;
