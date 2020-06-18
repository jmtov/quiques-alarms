import React from 'react';

import { GET_ALARMS_QUERY } from 'queries/alarm';
import { useListAlarms } from 'hooks/useListAlarms';

import Alarm from 'components/Alarm';
import Loading from 'components/Loading';
import Errored from 'components/Errored';

import './styles.scss';

function AlarmsList() {
  const { loading, error, data } = useListAlarms(GET_ALARMS_QUERY);

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
        />
      ))}
    </div>
  );
}

export default AlarmsList;
