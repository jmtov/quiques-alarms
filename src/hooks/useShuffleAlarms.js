import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, SET_ALARM_STATE_MUTATION } from 'queries/alarm';
import { ERRORS } from 'constants/errors';
import { randomizeAlarmsStates } from 'utils/helpers';
import client from 'config/apollo';

export const useShuffleAlarms = () => {
  const [updateAlarm, { loading:  mutationLoading }] = useMutation(SET_ALARM_STATE_MUTATION);
  const { data, loading: alarmsLoading } = useQuery(GET_ALARMS_QUERY);
  const [error, setError] = useState(null);

  // useCallback is creating a new function even with an empty deps array ¯\_(ツ)_/¯
  const shuffleAlarmsState = useCallback(async () => {
    const newStates = randomizeAlarmsStates(data?.alarms);
    const alarmsRequests = [];

    // NOTE: Should be a bulk operation but since it's for testing purposes: ¯\_(ツ)_/¯  - Using apollo-link-batch-http
    Object.values(newStates).forEach((alarm) => {
      alarmsRequests.push(updateAlarm({ variables: { ...alarm } }));
    });

    try {
      await Promise.all(alarmsRequests);
      client.resetStore();
    } catch(err) {
      setError(err.id ? err : ERRORS.SHUFFLE_ALARMS_ERROR);
    }
  }, [updateAlarm, data ]);

  return [
    shuffleAlarmsState,
    {
      error,
      loading: alarmsLoading || mutationLoading
    }
  ];
};
