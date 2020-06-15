import React, { useCallback, useContext, useMemo, useState } from 'react';

import StaticPropsContext from 'contexts/staticProps';
import { alarmPropType } from 'propTypes/alarms';
import { shallowCompare } from 'utils/helpers';
import { cn } from 'utils/style';
import ICONS from 'constants/icons';

import Field from 'components/Field';
import Icon from 'components/Icon';

import { FIELDS } from './constants';
import './styles.scss';

function AlarmForm({ className, id, initialValues, isEditing, onReset, onSubmit }) {
  const { alarmTypes, sources, triggerConditions } = useContext(StaticPropsContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  const commonFieldOptions = useMemo(() => {
    return  {
      tabIndex: isEditing ? 0 : -1,
      readOnly: !isEditing,
      disabled: !isEditing,
    };
  }, [isEditing]);

  const handleSubmit = event => {
    event.preventDefault();
    const [hasChanged] = shallowCompare(values, initialValues);
    const hasErrors = Object.values(errors).flatMap(Boolean).some(Boolean);

    console.log(errors);
    if (!hasErrors) {
      if (hasChanged) {
        onSubmit(values);
      } else {
        handleReset();
      }
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    onReset();
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

  const mappedSources = useMemo(() => {
    if (sources && sources.length) {
      const newSources = sources.map(source => ({ ...source, displayName: source.name }));
      return [{ id: '', displayName: 'Select a source' }, ...newSources];
    }
    return null;
  }, [sources]);

  const mappedAlarmTypes = useMemo(() => {
    if (alarmTypes && alarmTypes.length) {
      const newAlarms = alarmTypes.map(alarmType => ({ ...alarmType, displayName: alarmType.display_name }));
      return [{ id: '', displayName: 'Select a metric' }, ...newAlarms];
    }
    return null;
  }, [alarmTypes]);

  const mappedTriggerConditions = useMemo(() => {
    if (triggerConditions && triggerConditions.length) {
      const newTriggerConditions = triggerConditions.map(alarmType => ({ ...alarmType, displayName: alarmType.display_name }));
      return [{ id: '', displayName: 'Select a condition' }, ...newTriggerConditions];
    }
    return null;
  }, [triggerConditions]);

  return (
    <form className={cn('alarm-form', className)} onSubmit={handleSubmit}>
      <Field
        id={`${id}-${FIELDS.NAME.name}`}
        className="alarm-form__name"
        onChange={handleFieldChange}
        onError={handleFieldError}
        value={values[FIELDS.NAME.name]}
        {...FIELDS.NAME}
        {...commonFieldOptions}
      />
      <Field
        id={`${id}-${FIELDS.SOURCE_ID.name}`}
        className="alarm-form__source"
        onChange={handleFieldChange}
        onError={handleFieldError}
        options={mappedSources}
        value={values[FIELDS.SOURCE_ID.name]}
        {...FIELDS.SOURCE_ID}
        {...commonFieldOptions}
      />
      <Field
        id={`${id}-${FIELDS.TYPE_ID.name}`}
        className="alarm-form__trigger-type"
        onChange={handleFieldChange}
        onError={handleFieldError}
        options={mappedAlarmTypes}
        value={values[FIELDS.TYPE_ID.name]}
        {...FIELDS.TYPE_ID}
        {...commonFieldOptions}
      />
      <Field
        id={`${id}-${FIELDS.TRIGGER_CONDITION_ID.name}`}
        className="alarm-form__trigger-condition"
        onChange={handleFieldChange}
        onError={handleFieldError}
        options={mappedTriggerConditions}
        value={values[FIELDS.TRIGGER_CONDITION_ID.name]}
        {...FIELDS.TRIGGER_CONDITION_ID}
        {...commonFieldOptions}
      />
      <Field
        id={`${id}-${FIELDS.TRIGGER_VALUE.name}`}
        className="alarm-form__trigger-value"
        onChange={handleFieldChange}
        onError={handleFieldError}
        validate={values[FIELDS.TRIGGER_VALUE.validate]}
        value={values[FIELDS.TRIGGER_VALUE.name]}
        {...FIELDS.TRIGGER_VALUE}
        {...commonFieldOptions}
      />
      <span className="alarm-form__trigger-unit">%</span>
      {isEditing && (
        <div className="alarm-form__actions">
          <button
            className="action-button"
            onClick={handleSubmit}
            title="Save Changes"
            type="submit"
          >
            <Icon name={ICONS.DONE} />
          </button>
          <button
            className="action-button"
            onClick={handleReset}
            title="Cancel Changes"
            type="reset"
          >
            <Icon name={ICONS.CLEAR} />
          </button>
        </div>
      )}
    </form>
  );
}

AlarmForm.defaultProps = {
  initialValues: {
    [FIELDS.NAME.name]: '',
    [FIELDS.SOURCE_ID.name]: null,
    [FIELDS.TYPE_ID.name]: null,
    [FIELDS.TRIGGER_CONDITION_ID.name]: null,
    [FIELDS.TRIGGER_VALUE.name]: '',
  }
};

AlarmForm.propTypes = alarmPropType;

export default AlarmForm;
