import { useCallback, useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, DELETE_ALARM_MUTATION } from 'queries/alarm';
import { ERRORS } from 'constants/errors';
import AlarmsContext from 'contexts/alarms';

function updateAlarmsQueryCache(cache, id, filters) {
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY, variables: filters });
  const newAlarms = existingAlarms.alarms.filter(alarm => alarm.id !== id);

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: newAlarms },
    variables: filters
  });
}
export const useDeleteAlarm = (id) => {
  const { filters } = useContext(AlarmsContext);
  const [error, setError] = useState(null);
  const [deleteAlarmQuery, { data, loading }] = useMutation(DELETE_ALARM_MUTATION);

  const updateCache = useCallback(cache => {
    updateAlarmsQueryCache(cache, id, filters);
  }, [id, filters]);

  // useCallback is creating a new function even with an empty deps array ¯\_(ツ)_/¯
  const deleteAlarm = useCallback(async () => {
    try {
      if (!id) throw ERRORS.NO_ID;
      await deleteAlarmQuery({
        variables: { id },
        update: updateCache
      });

      if (error) {
        setError(null);
      }
    } catch(err) {
      setError(err.id ? err : ERRORS.DELETE_ALARM_ERROR);
    }
  }, [id, deleteAlarmQuery, error, updateCache]);



  return [deleteAlarm, { data, error, loading }];
};
