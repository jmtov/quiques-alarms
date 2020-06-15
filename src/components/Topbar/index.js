import React from 'react';
import { string } from 'prop-types';

import Logo from 'assets/logo.png';
import ICONS from 'constants/icons';
import Icon from 'components/Icon';

import Title from './components/Title';
import Notifications from './components/Notifications';
import './styles.scss';

function Topbar() {
  return (
    <div className="topbar">
      <img src={Logo} className="topbar__logo" alt="logo" />
      <Title className="topbar__title" />
      <div className="topbar__actions">
        <button className="action-button" title="Shuffle Alarms State">
          <Icon name={ICONS.SHUFFLE} />
        </button>
        <Notifications />
      </div>
    </div>
  );
}

Topbar.propTypes = {
  title: string
};

export default Topbar;
