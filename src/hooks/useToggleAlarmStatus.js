import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, SET_ALARM_STATE_MUTATION } from 'queries/alarm';
import { ALARM_STATUS } from 'constants/alarms';

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

export const useToggleAlarmStatus = (id, status, previous_status) => {
  const [isPaused, setIsPaused] = useState(status.id === ALARM_STATUS.PAUSED);
  const [error, setError] = useState(null);
  const [toggleAlarmStatus, { data }] = useMutation(SET_ALARM_STATE_MUTATION);

  const toggleAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    if (isPaused) {
      toggleAlarmStatus({
        variables: { id, newStatusId: previous_status.id },
        update: (cache, newData) => updateAlarmsQueryCache(cache, newData)
      });
      setIsPaused(false);
    } else {
      toggleAlarmStatus({
        variables: { id, newStatusId: 2, oldStatusId: status.id },
        update: (cache, newData) => updateAlarmsQueryCache(cache, newData)
      });
      setIsPaused(true);
    }
  }, [isPaused, id, status.id, previous_status?.id,toggleAlarmStatus]);

  return [toggleAlarm, { data, error }];
};
