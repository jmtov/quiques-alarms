import React, { useCallback, useState } from 'react';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';

function Alarms() {
  const [filter, setFilters] = useState({});

  const handleFilterChange = useCallback(newFilters => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="alarms-screen">
      <FilterBar onFilterChange={handleFilterChange} />
      <AlarmsList nameFilter={filter.nameFilter} statusFilter={filter.statusFilter} />
      <Toolbar className="alarms-screen__toolbar" />
    </div>
  );
}


export default Alarms;
