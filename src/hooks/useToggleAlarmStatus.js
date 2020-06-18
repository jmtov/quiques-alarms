import { useCallback, useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, SET_ALARM_STATE_MUTATION } from 'queries/alarm';
import { ALARM_STATUS } from 'constants/alarms';
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

export const useToggleAlarmStatus = (id, status_id, previous_status_id) => {
  const { filters } = useContext(AlarmsContext);
  const [isPaused, setIsPaused] = useState(status_id === ALARM_STATUS.PAUSED);
  const [error, setError] = useState(null);
  const [toggleAlarmStatus, { data, loading, _error }] = useMutation(SET_ALARM_STATE_MUTATION);

  const updateCache = useCallback((cache, data) => {
    updateAlarmsQueryCache(cache, data, filters);
  }, [filters]);

  // useCallback is creating a new function even with an empty deps array ¯\_(ツ)_/¯
  const toggleAlarm = useCallback(() => {
    if (!id) setError('No id provided.');
    if (isPaused) {
      toggleAlarmStatus({
        variables: { id, status_id: previous_status_id, previous_status_id: 0 },
        update: updateCache
      });
      setIsPaused(false);
    } else {
      toggleAlarmStatus({
        variables: { id, status_id: 2, previous_status_id: status_id },
        update: updateCache
      });
      setIsPaused(true);
    }
  }, [isPaused, id, status_id, previous_status_id, toggleAlarmStatus, updateCache]);

  return [toggleAlarm, { data, error: _error || error, loading }];
};
