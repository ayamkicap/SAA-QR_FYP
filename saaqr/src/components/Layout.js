// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
// import SideNav from './sideNav';

const Layout = () => {
  return (
    <div>
      <div style={{padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
