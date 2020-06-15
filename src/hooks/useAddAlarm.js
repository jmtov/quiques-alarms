import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, ADD_ALARM_MUTATION } from 'queries/alarm';

function updateAlarmsQueryCache(cache, updatedAlarmData, filters) {
  console.log(updatedAlarmData);
  const newAlarmData = updatedAlarmData?.data?.insert_alarms?.returning?.[0];
  const existingAlarms = cache.readQuery({ query: GET_ALARMS_QUERY, variables: filters });

  cache.writeQuery({
    query: GET_ALARMS_QUERY,
    data: { alarms: [...existingAlarms.alarms, newAlarmData] }
  });
}

export const useAddAlarm = filters => {
  const [_addAlarm, { data, error, loading }] = useMutation(ADD_ALARM_MUTATION);

  const updateCache = useCallback((cache, data) => {
    updateAlarmsQueryCache(cache, data, filters);
  }, [filters]);

  const updateAlarm = useCallback(values => {
    _addAlarm({
      variables: { ...values },
      update: updateCache
    });
  }, [_addAlarm, updateCache]);

  return [updateAlarm, { data, error, loading }];
};
