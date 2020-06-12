import React from 'react';

import logo from 'assets/logo.png';

import './styles.scss';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="header__logo" alt="logo" />
        <h1 className="header__title">Quique's Alarms App</h1>
        <h2 className="header__subtitle">This app is not ready yet.</h2>

      </header>
    </div>
  );
}

export default App;
