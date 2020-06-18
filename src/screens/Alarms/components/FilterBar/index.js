import React, { useContext, useMemo, useState, useCallback } from 'react';

import StaticPropsContext from 'contexts/staticProps';
import AlarmsContext from 'contexts/alarms';
import ICONS from 'constants/icons';
import { shallowCompare } from 'utils/helpers';

import Field from 'components/Field';
import Icon from 'components/Icon';

import { FIELDS } from './constants';
import './styles.scss';

function FilterBar() {
  const { alarmStatuses } = useContext(StaticPropsContext);
  const { filters: initialFilters, setFilters } = useContext(AlarmsContext);
  const [values, setValues] = useState(initialFilters);
  const [, setErrors] = useState(null);

  const mappedStatuses = useMemo(() => {
    if (alarmStatuses?.length) {
      const newStatuses = alarmStatuses.map(source => ({ ...source, displayName: source.display_name }));
      return [{ id: '', displayName: 'No filter' }, ...newStatuses];
    }
    return null;
  }, [alarmStatuses]);

  const handleSubmit = event => {
    event.preventDefault();
    const [hasChanged] = shallowCompare(values, initialFilters);

    if (hasChanged) {
      const name_filter = values[FIELDS.NAME_FILTER.name] || null;
      const status_filter = values[FIELDS.STATUS_FILTER.name];

      setFilters({ name_filter, status_filter });
    }
  };

  const handleFieldError = useCallback(({ name: fieldName, errors: fieldErrors }) => {
    if (fieldName) {
      setErrors(errors => ({ ...errors, [fieldName]: fieldErrors }));
    }
  }, []);

  const handleFieldChange = useCallback(({ name: fieldName, value: fieldValue }) => {
    if (fieldName) {
      setValues(values => ({ ...values, [fieldName]: fieldValue }));
    }
  }, []);

  return (
    <form className="filter-bar">
      <Field
        className="filter-bar__field"
        onChange={handleFieldChange}
        onError={handleFieldError}
        value={values[FIELDS.NAME_FILTER.name] || ''}
        type="search"
        {...FIELDS.NAME_FILTER}
      />
      <Field
        className="filter-bar__field"
        onChange={handleFieldChange}
        onError={handleFieldError}
        options={mappedStatuses}
        value={values[FIELDS.STATUS_FILTER.name]}
        type="number"
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
