import { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ALARMS_QUERY, SET_ALARM_STATE_MUTATION } from 'queries/alarm';
import { getRandomInt } from 'utils/helpers';

const randomizeAlarmsStates = alarms => {
  if (alarms) {
    const sources = {};
    alarms.forEach(alarm => {
      const uId = `${alarm.source.id}-${alarm.type.id}`;
      const newStatusId = getRandomInt(3);
      const previousId = newStatusId === 2 ? getRandomInt(2) : 0;
      if (!sources[uId]) {
        sources[uId] = { id: alarm.id, previous_status_id: previousId, status_id: newStatusId };
      }
    });
    return sources;
  }
};

export const useShuffleAlarms = () => {
  const { data, loading: alarmsLoading } = useQuery(GET_ALARMS_QUERY);
  const [updateAlarm, { error, loading:  mutationLoading }] = useMutation(SET_ALARM_STATE_MUTATION);

  // useCallback is creating a new function even with an empty deps array ¯\_(ツ)_/¯
  const shuffleAlarmsState = useCallback(() => {
    const newStates = randomizeAlarmsStates(data?.alarms);

    // NOTE: Should be a bulk operation but since it's for testing purposes: ¯\_(ツ)_/¯  - Using apollo-link-batch-http
    Object.values(newStates).forEach(alarm => {
      updateAlarm({
        variables: { ...alarm }
      });
    });
  }, [updateAlarm, data]);

  return [shuffleAlarmsState, { error, loading: alarmsLoading || mutationLoading }];
};
