import React from 'react';

import { AlarmsContextProvider } from 'contexts/alarms';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';

function Alarms() {
  return (
    <AlarmsContextProvider>
      <div className="alarms-screen">
        <FilterBar />
        <AlarmsList />
        <Toolbar />
      </div>
    </AlarmsContextProvider>
  );
}


export default Alarms;
