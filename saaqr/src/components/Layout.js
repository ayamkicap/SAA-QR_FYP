// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './sideNav';

const Layout = () => {
  return (
    <div>
      <SideNav />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
