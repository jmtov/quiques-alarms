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

export const useToggleAlarmStatus = (id, status_id, previous_status_id) => {
  const [isPaused, setIsPaused] = useState(status_id === ALARM_STATUS.PAUSED);
  const [error, setError] = useState(null);
  const [toggleAlarmStatus, { data }] = useMutation(SET_ALARM_STATE_MUTATION);

  const toggleAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    if (isPaused) {
      toggleAlarmStatus({
        variables: { id, status_id: previous_status_id, previous_status_id: 0 },
        update: updateAlarmsQueryCache
      });
      setIsPaused(false);
    } else {
      toggleAlarmStatus({
        variables: { id, status_id: 2, previous_status_id: status_id },
        update: updateAlarmsQueryCache
      });
      setIsPaused(true);
    }
  }, [isPaused, id, status_id, previous_status_id, toggleAlarmStatus]);

  return [toggleAlarm, { data, error }];
};
