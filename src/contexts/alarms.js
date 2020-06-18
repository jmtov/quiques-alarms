import React, { useReducer, useCallback } from 'react';
import { node } from 'prop-types';

import { normalizeFilters } from 'utils/transforms';

const AlarmsContext = React.createContext();

// As the app grows, it would be a good idea to move the reducers/actions to a new file.
const INITIAL_STATE = {
  filters: {
    name_filter: null,
    status_filter: null,
  },
};

const ACTIONS = {
  SET_FILTERS: 'SET_FILTERS',
};

const REDUCERS = {
  [ACTIONS.SET_FILTERS]: (state, action) => {
    return { ...state, filters: action.payload };
  },
};

const reducer = (state, action) => {
  return REDUCERS[action.type](state, action);
};

export const AlarmsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { filters } = state;

  const setFilters = useCallback(filters => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: normalizeFilters(filters) });
  }, []);

  return (
    <AlarmsContext.Provider value={{ filters, setFilters }}>
      {children}
    </AlarmsContext.Provider>
  );
};

AlarmsContextProvider.propTypes = {
  children: node
};

export default AlarmsContext;
