import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const SideNav = () => {
  const { isDeveloper,isAdmin} = useAuth()
  return (
    <div className="sidenav">
      <Link to="/dash" className="sidenav-item">
        <i className="fas fa-tachometer-alt"></i> Dashboard
      </Link>
      
      {isAdmin && (
        <Link to="/dash/users" className="sidenav-item">
          <i className="fas fa-users"></i> Users
        </Link>
      )}
      <Link to="/dash/events" className="sidenav-item">
        <i className="fas fa-calendar-alt"></i> Events
      </Link>
      <Link to="/dash/profile" className="sidenav-item">
        <i className="fas fa-calendar-alt"></i> Profile
      </Link>
      {isDeveloper && (
        <Link to="/dash/logcontrol" className="sidenav-item">
          <i className="fas fa-calendar-alt"></i> Log Control
        </Link>
      )}
    </div>
  );
};

export default SideNav;
