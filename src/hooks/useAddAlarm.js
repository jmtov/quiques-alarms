import { useCallback, useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, ADD_ALARM_MUTATION } from 'queries/alarm';
import { ERRORS } from 'constants/errors';
import AlarmsContext from 'contexts/alarms';

function updateAlarmsQueryCache(cache, updatedAlarmData, filters) {
  const newAlarmData = updatedAlarmData?.data?.insert_alarms?.returning?.[0];
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY, variables: filters });

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: [...existingAlarms.alarms, newAlarmData] },
    variables: filters,
  });
}

export const useAddAlarm = () => {
  const { filters } = useContext(AlarmsContext);
  const [addAlarmQuery, { data, loading }] = useMutation(ADD_ALARM_MUTATION);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const updateCache = useCallback((cache, data) => {
    updateAlarmsQueryCache(cache, data, filters);
  }, [filters]);

  // useCallback is creating a new function even with an empty deps array ¯\_(ツ)_/¯
  const updateAlarm = useCallback(async values => {
    if (done) {
      setDone(false);
    }
    try {
      await addAlarmQuery({
        variables: values,
        update: updateCache
      });

      if (error) {
        setError(null);
      }

      setDone(true);
    } catch(err) {
      setError(err.id ? err : ERRORS.ADD_ALARM_ERROR);
    }
  }, [addAlarmQuery, done, error, updateCache]);

  return [updateAlarm, { data, done, error, loading }];
};
