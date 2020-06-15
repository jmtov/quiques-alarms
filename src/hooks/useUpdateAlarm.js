import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, UPDATE_ALARM_MUTATION } from 'queries/alarm';

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
    data: { alarms: newAlarms }
  });
}

export const useUpdateAlarm = (id, filters) => {
  const [error, setError] = useState(null);
  const [_updateAlarm, { data, error: _error, loading }] = useMutation(UPDATE_ALARM_MUTATION);

  const updateCache = useCallback(cache => {
    updateAlarmsQueryCache(cache, id, filters);
  }, [id, filters]);

  const updateAlarm = useCallback(values => {
    if (!id) setError('No id provided.');
    _updateAlarm({
      variables: { id, ...values },
      update: updateCache
    });
  }, [id, _updateAlarm, updateCache]);

  return [updateAlarm, { data, error: error ? error : _error, loading }];
};
