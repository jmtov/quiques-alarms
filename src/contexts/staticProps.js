import React from 'react';
import { node } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_SOURCES_QUERY } from 'queries/source';
import { GET_ALARM_TYPES_QUERY } from 'queries/alarmTypes';
import { GET_ALARM_STATUSES_QUERY } from 'queries/alarmStatuses';
import { GET_TRIGGER_CONDITIONS_QUERY } from 'queries/triggerConditions';

import Loading from 'components/Loading';

const StaticPropsContext = React.createContext();

export const StaticPropsContextProvider = ({ children }) => {
  const sources = useQuery(GET_SOURCES_QUERY);
  const alarmTypes = useQuery(GET_ALARM_TYPES_QUERY);
  const alarmStatuses = useQuery(GET_ALARM_STATUSES_QUERY);
  const triggerConditions = useQuery(GET_TRIGGER_CONDITIONS_QUERY);

  if (
    alarmTypes.loading
    && alarmStatuses.loading
    && sources.loading
    && triggerConditions.loading
  ) {
    return <Loading />;
  }

  return (
    <StaticPropsContext.Provider
      value={{
        alarmTypes: alarmTypes.data?.alarm_types,
        alarmStatuses: alarmStatuses.data?.alarm_statuses,
        sources: sources.data?.sources,
        triggerConditions: triggerConditions.data?.trigger_conditions
      }}>
      {children}
    </StaticPropsContext.Provider>
  );
};

StaticPropsContextProvider.propTypes = {
  children: node
};

export default StaticPropsContext;
