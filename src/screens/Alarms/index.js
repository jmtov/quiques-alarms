import React, { useCallback, useState, useMemo } from 'react';

import { normalizeFilters } from 'utils/transforms';

import AlarmsList from './components/AlarmsList';
import FilterBar from './components/FilterBar';
import Toolbar from './components/Toolbar';
import './styles.scss';

function Alarms() {
  const [rawFilters, setRawFilters] = useState({});

  const filters = useMemo(() => normalizeFilters(rawFilters), [rawFilters]);

  const handleFilterChange = useCallback(newFilters => {
    setRawFilters(newFilters);
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
