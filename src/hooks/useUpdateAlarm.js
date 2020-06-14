import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, UPDATE_ALARM_MUTATION } from 'queries/alarm';

// TODO: Thiis is the same as in the useToggleAlarmStatus hook. Keep just one.
function updateAlarmsQueryCache(cache, updatedAlarmData) {
  const newAlarmData = updatedAlarmData?.data?.update_alarms?.returning?.[0];
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY });
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

export const useUpdateAlarm = id => {
  const [error, setError] = useState(null);
  const [_updateAlarm, { data, error: _error, loading }] = useMutation(UPDATE_ALARM_MUTATION);

  const updateCache = useCallback((cache => {
    updateAlarmsQueryCache(cache, id);
  }, []));

  const updateAlarm = useCallback(values => {
    if (!id) setError('No id provided.');
    _updateAlarm({
      variables: { id, ...values },
      update: updateCache
    });
  }, [id, _updateAlarm, updateCache]);

  return [updateAlarm, { data, error: error ? error : _error, loading }];
};
