import { useCallback, useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, UPDATE_ALARM_MUTATION } from 'queries/alarm';
import { ERRORS } from 'constants/errors';
import AlarmsContext from 'contexts/alarms';

function updateAlarmsQueryCache(cache, updatedAlarmData, filters) {
  const newAlarmData = updatedAlarmData?.data?.update_alarms?.returning?.[0];
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY, variables: filters });
  const newAlarms = existingAlarms.alarms.map(alarm => {
    if (alarm.id === updatedAlarmData.id) {
      return { ...alarm, ...newAlarmData };
    } else {
      return alarm;
    }
  });

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: newAlarms },
    variables: filters
  });
}

export const useUpdateAlarm = (id) => {
  const { filters } = useContext(AlarmsContext);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const [updateAlarmQuery, { data, loading }] = useMutation(UPDATE_ALARM_MUTATION);

  const updateCache = useCallback(cache => {
    updateAlarmsQueryCache(cache, id, filters);
  }, [id, filters]);

  const updateAlarm = useCallback(async values => {
    if (done) {
      setDone(false);
    }

    try {
      if (!id) throw ERRORS.NO_ID;
      await updateAlarmQuery({
        variables: { id, ...values },
        update: updateCache
      });

      if (error) {
        setError(null);
      }
      setDone(true);
    } catch(err) {
      setError(err.id ? err : ERRORS.UPDATE_ALARM_ERROR);
    }
  }, [id, done, error, updateAlarmQuery, updateCache]);

  return [updateAlarm, { data, done, error, loading }];
};
