import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, DELETE_ALARM_MUTATION } from 'queries/alarm';

function updateAlarmsQueryCache(cache, id) {
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY });
  const newAlarms = existingAlarms.alarms.filter(alarm => alarm.id !== id);

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: newAlarms }
  });
}

export const useDeleteAlarm = id => {
  const [error, setError] = useState(null);
  const [_deleteAlarm, { data, error: _error, loading }] = useMutation(DELETE_ALARM_MUTATION);

  const deleteAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    _deleteAlarm({
      variables: { id },
      update: cache => updateAlarmsQueryCache(cache, id)
    });
  }, [id, _deleteAlarm]);

  return [deleteAlarm, { data, error: error ? error : _error, loading }];
};