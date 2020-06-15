import React, { useContext, useMemo, useState, useCallback } from 'react';
import { func, number, shape, string } from 'prop-types';

import StaticPropsContext from 'contexts/staticProps';
import ICONS from 'constants/icons';

import Field from 'components/Field';
import Icon from 'components/Icon';

import { FIELDS } from './constants';
import './styles.scss';

function FilterBar({ onFilterChange, filters }) {
  const { alarmStatuses } = useContext(StaticPropsContext);
  const [, setErrors] = useState(null);
  const [values, setValues] = useState({
    [FIELDS.NAME_FILTER.name]: filters[FIELDS.NAME_FILTER.name] || '',
    [FIELDS.STATUS_FILTER.name]: filters[FIELDS.STATUS_FILTER.name]
  });

  const mappedStatuses = useMemo(() => {
    if (alarmStatuses?.length) {
      const newStatuses = alarmStatuses.map(source => ({ ...source, displayName: source.display_name }));
      return [{ id: '', displayName: 'No filter' }, ...newStatuses];
    }
    return null;
  }, [alarmStatuses]);

  const handleSubmit = event => {
    event.preventDefault();
    onFilterChange({
      nameFilter: values[FIELDS.NAME_FILTER.name] || null,
      statusFilter: Number(values[FIELDS.STATUS_FILTER.name]) || null
    });
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
        value={values[FIELDS.NAME_FILTER.name]}
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

FilterBar.propTypes = {
  onFilterChange: func,
  filters: shape({
    name_filter: string,
    status_filter: number,
  })
};

export default FilterBar;
