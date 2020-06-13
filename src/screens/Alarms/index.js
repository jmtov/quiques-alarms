import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Alarm from 'components/Alarm';

import ALARMS_QUERY from './queries';

function Alarms() {
  const { loading, error, data } = useQuery(ALARMS_QUERY);

  // TODO: Improve this loading and error rendering
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :/</h1>;

  return (
    <div className="alarms">
      {data.alarms.map(alarm => (
        <Alarm
          key={alarm.id}
          name={alarm.name}
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
