import React from 'react';
import { node } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_SOURCES_QUERY } from 'queries/source';
import { GET_ALARM_TYPES_QUERY } from 'queries/alarmTypes';
import { GET_TRIGGER_CONDITIONS_QUERY } from 'queries/triggerConditions';

const StaticPropsContext = React.createContext();

// TODO: Write this better
export const StaticPropsContextProvider = ({ children }) => {
  const sources = useQuery(GET_SOURCES_QUERY);
  const alarmTypes = useQuery(GET_ALARM_TYPES_QUERY);
  const triggerConditions = useQuery(GET_TRIGGER_CONDITIONS_QUERY);

  return (
    <StaticPropsContext.Provider
      value={{
        alarmTypes: alarmTypes.data?.alarm_types,
        sources: sources.data?.sources,
        triggerConditions: triggerConditions.data?.trigger_conditions
      }}>
      {!sources.loading && !alarmTypes.loading && !triggerConditions.loading && children}
    </StaticPropsContext.Provider>
  );
};

StaticPropsContextProvider.propTypes = {
  children: node
};

export default StaticPropsContext;
