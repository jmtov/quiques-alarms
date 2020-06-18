import React from 'react';

import { AlarmsContextProvider } from 'contexts/alarms';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';
import ErrorBoundary from 'components/ErrorBoundary';

function Alarms() {
  return (
    <AlarmsContextProvider>
      <ErrorBoundary>
        <div className="alarms-screen">
          <FilterBar />
          <AlarmsList />
          <Toolbar />
        </div>
      </ErrorBoundary>
    </AlarmsContextProvider>
  );
}


export default Alarms;
