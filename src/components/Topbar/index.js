import React from 'react';
import { string } from 'prop-types';

import Logo from 'assets/logo.png';

import Title from './components/Title';
import Notifications from './components/Notifications';
import ShuffleAlarmsStateButton from './components/ShuffleAlarmsStateButton';
import './styles.scss';

function Topbar() {
  return (
    <div className="topbar">
      <img src={Logo} className="topbar__logo" alt="logo" />
      <Title className="topbar__title" />
      <div className="topbar__actions">
        <ShuffleAlarmsStateButton />
        <Notifications />
      </div>
    </div>
  );
}

Topbar.propTypes = {
  title: string
};

export default Topbar;
