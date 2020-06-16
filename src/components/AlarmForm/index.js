import React, { useCallback, useContext, useMemo, useState } from 'react';

import StaticPropsContext from 'contexts/staticProps';
import { useUpdateAlarm } from 'hooks/useUpdateAlarm';
import { alarmPropType } from 'propTypes/alarms';
import { shallowCompare } from 'utils/helpers';
import { cn } from 'utils/style';
import ICONS from 'constants/icons';

import ActionButton from 'components/ActionButton';
import Field from 'components/Field';

import { FIELDS } from './constants';
import './styles.scss';

function AlarmForm({ className, id, initialValues, isEditing, onReset, onSubmit }) {
  const { alarmTypes, sources, triggerConditions } = useContext(StaticPropsContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [updateAlarm] = useUpdateAlarm(id);

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

    if (!hasErrors) {
      if (hasChanged) {
        onSubmit(values);
        updateAlarm(values);
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
          <ActionButton
            onClick={handleSubmit}
            title="Save Changes"
            type="submit"
            icon={ICONS.DONE}
          />
          <ActionButton
            onClick={handleReset}
            title="Cancel"
            type="reset"
            icon={ICONS.CLEAR}
          />
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
