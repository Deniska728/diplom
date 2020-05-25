import React from 'react';
import Sidebar from './common/Sidebar';

const Layout = ({ children, user }) => {
  return (
    <div className="layout-container">
      <div className="sidebar-wrapper">
        <Sidebar user={user} />
      </div>
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default Layout;
