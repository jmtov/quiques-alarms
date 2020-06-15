import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, DELETE_ALARM_MUTATION } from 'queries/alarm';

function updateAlarmsQueryCache(cache, id, filters) {
  console.log(filters);
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY, variables: filters });
  const newAlarms = existingAlarms.alarms.filter(alarm => alarm.id !== id);

  console.log(existingAlarms);
  console.log(newAlarms);

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: newAlarms }
  });
}

export const useDeleteAlarm = (id, filters) => {
  const [error, setError] = useState(null);
  const [_deleteAlarm, { data, error: _error, loading }] = useMutation(DELETE_ALARM_MUTATION);

  const updateCache = useCallback(cache => {
    updateAlarmsQueryCache(cache, id, filters);
  }, [id, filters]);

  const deleteAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    _deleteAlarm({
      variables: { id },
      update: updateCache
    });
  }, [id, _deleteAlarm, updateCache]);

  return [deleteAlarm, { data, error: error ? error : _error, loading }];
};
