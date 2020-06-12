import React from 'react';
import { node } from 'prop-types';

import Navbar from 'components/Navbar';
import Topbar from 'components/Topbar';

import './styles.scss';

function Layout({ children }) {
  return (
    <div className="layout">
      <Topbar />
      <Navbar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
