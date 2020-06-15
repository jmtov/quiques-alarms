import React, { useCallback, useState } from 'react';

import { normalizeFilters } from 'utils/transforms';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';


function Alarms() {
  const [filters, setFilters] = useState(normalizeFilters({}));

  const handleFilterChange = useCallback(newFilters => {
    setFilters(normalizeFilters(newFilters));
  }, []);

  return (
    <div className="alarms-screen">
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <AlarmsList filters={filters} />
      <Toolbar filters={filters} className="alarms-screen__toolbar" />
    </div>
  );
}


export default Alarms;
