import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY, SET_ALARM_STATE_MUTATION } from 'queries/alarm';
import { randomizeAlarmsStates } from 'utils/helpers';
import client from 'config/apollo';

export const useShuffleAlarms = () => {
  const [updateAlarm, { error: mutationError, loading:  mutationLoading }] = useMutation(SET_ALARM_STATE_MUTATION);
  const { data, loading: alarmsLoading, error: alarmsError } = useQuery(GET_ALARMS_QUERY);
  const [shufflingError, setShufflingError] = useState(null);

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
      // TODO: Check why store is not being invalidated, resulting in a weird behavior when pausing/unpausing alarms.
      client.resetStore();
    } catch (error) {
      setShufflingError(error);
    }
  }, [updateAlarm, data ]);

  return [
    shuffleAlarmsState,
    {
      errors: [mutationError, alarmsError, shufflingError],
      loading: alarmsLoading || mutationLoading
    }
  ];
};
