import React from 'react';

import Logo from 'assets/logo.png';

import './styles.scss';

function Loading() {
  return (
    <div className="loading">
      <img src={Logo} className="loading__logo" alt="" aria-hidden />
      <span className="loading__text">Loading</span>
    </div>
  );
}

export default Loading;
