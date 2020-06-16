import React from 'react';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';

function Alarms() {
  return (
    <div className="alarms-screen">
      <FilterBar />
      <AlarmsList />
      <Toolbar className="alarms-screen__toolbar" />
    </div>
  );
}


export default Alarms;
