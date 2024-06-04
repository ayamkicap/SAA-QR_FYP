// src/components/SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="sidenav">
      <Link to="/dash">Dashboard</Link>
      <Link to="/dash/users">Users</Link>
      <Link to="/dash/events">Events</Link>
    </div>
  );
};

export default SideNav;



