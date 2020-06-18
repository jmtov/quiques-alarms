import { useContext } from 'react';
import {  useQuery } from '@apollo/react-hooks';

import { GET_ALARMS_QUERY } from 'queries/alarm';
import AlarmsContext from 'contexts/alarms';

export const useListAlarms = () => {
  const { filters } = useContext(AlarmsContext);
  const { loading, error, data } = useQuery(
    GET_ALARMS_QUERY,
    filters ? { variables: filters } : undefined
  );


  return { data, error, loading };
};
