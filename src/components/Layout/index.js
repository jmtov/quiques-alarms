import React from 'react';
import { node } from 'prop-types';

import Navbar from 'components/Navbar';

function Layout({ children }) {
  return (
    <div className="layout">
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
