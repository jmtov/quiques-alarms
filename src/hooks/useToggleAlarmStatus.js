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

export const useToggleAlarmStatus = (id, statusId, previousStatusId) => {
  const [isPaused, setIsPaused] = useState(statusId === ALARM_STATUS.PAUSED);
  const [error, setError] = useState(null);
  const [toggleAlarmStatus, { data }] = useMutation(SET_ALARM_STATE_MUTATION);

  const toggleAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    if (isPaused) {
      toggleAlarmStatus({
        variables: { id, newStatusId: previousStatusId },
        update: updateAlarmsQueryCache
      });
      setIsPaused(false);
    } else {
      toggleAlarmStatus({
        variables: { id, newStatusId: 2, oldStatusId: statusId },
        update: updateAlarmsQueryCache
      });
      setIsPaused(true);
    }
  }, [isPaused, id, statusId, previousStatusId, toggleAlarmStatus]);

  return [toggleAlarm, { data, error }];
};
