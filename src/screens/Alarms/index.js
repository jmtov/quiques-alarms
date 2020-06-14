import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY } from 'queries/alarm';

import Alarm from 'components/Alarm';

function Alarms() {
  const { loading, error, data } = useQuery(GET_ALARMS_QUERY);

  // TODO: Improve this loading and error rendering
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :/</h1>;

  return (
    <div className="alarms">
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


export default Alarms;
