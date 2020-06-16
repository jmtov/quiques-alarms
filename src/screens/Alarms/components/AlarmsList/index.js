import React from 'react';
import { number, shape, string } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY } from 'queries/alarm';

import Alarm from 'components/Alarm';
import Loading from 'components/Loading';
import Errored from 'components/Errored';

import './styles.scss';

window.a = [];
function AlarmsList({ filters }) {
  const { loading, error, data } = useQuery(
    GET_ALARMS_QUERY,
    // TODO: QUERIES: Check how to structure the query data for filters to avoid queries being discarded.
    // { variables: filters }
  );

  if (loading) return <Loading />;
  if (error) return <Errored message="Coudn't load results" />;
  if (!data.alarms.length) return <Errored message="No results" />;

  return (
    <div className="alarms-list">
      {data.alarms.map(alarm => (
        <Alarm
          key={alarm.id}
          id={alarm.id}
          name={alarm.name}
          previous_status={alarm.previous_status}
          source={alarm.source}
          status={alarm.status}
          trigger_condition={alarm.trigger_condition}
          trigger_value={alarm.trigger_value}
          type={alarm.type}
          currentFilters={filters}
        />
      ))}
    </div>
  );
}

AlarmsList.propTypes = {
  filters: shape({
    nameFilter: string,
    statusFilter: number
  })
};

export default AlarmsList;
