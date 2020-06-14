import React, { useContext, useMemo, useState, useCallback } from 'react';

import StaticPropsContext from 'contexts/staticProps';
import ICONS from 'constants/icons';

import Field from 'components/Field';
import Icon from 'components/Icon';

import './styles.scss';
import { FIELDS } from './constants';

const defaultState = {
  [FIELDS.NAME_FILTER.name]: '',
  [FIELDS.STATUS_FILTER.name]: '',
};

function FilterBar({ onFilterChange }) {
  const { alarmStatuses } = useContext(StaticPropsContext);
  const [, setErrors] = useState(null);
  const [values, setValues] = useState(defaultState);

  const mappedStatuses = useMemo(() => {
    if (alarmStatuses?.length) {
      const newStatuses = [{ id: null, displayName: 'No filter' }];
      return newStatuses.concat(alarmStatuses.map(source => ({ ...source, displayName: source.display_name })));
    }
    return null;
  }, [alarmStatuses]);

  const handleSubmit = event => {
    event.preventDefault();
    onFilterChange(values);
  };

  const handleFieldError = useCallback(({ name: fieldName, errors: fieldErrors }) => {
    if (fieldName) {
      setErrors(errors => ({ ...errors, [fieldName]: fieldErrors }));
    }
  }, []);

  const handleFieldChange = useCallback(({ name: fieldName, value: fieldValue }) => {
    console.log(fieldName, fieldValue);
    if (fieldName) {
      setValues(values => ({ ...values, [fieldName]: fieldValue }));
    }
  }, []);

  return (
    <form className="filter-bar">
      <Field
        className="filter-bar__field"
        onChange={handleFieldChange}
        onError={handleFieldChange}
        value={values[FIELDS.NAME_FILTER.name]}
        {...FIELDS.NAME_FILTER}
      />
      <Field
        className="filter-bar__field"
        onChange={handleFieldChange}
        onError={handleFieldError}
        options={mappedStatuses}
        value={values[FIELDS.STATUS_FILTER.name]}
        {...FIELDS.STATUS_FILTER}
      />

      <button
        className="filter-bar__submit-button"
        onClick={handleSubmit}
        title="Apply Filters"
        type="submit"
      >
        <Icon name={ICONS.SEARCH} />
      </button>
    </form>
  );

}

export default FilterBar;
