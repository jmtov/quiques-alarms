import React, { useCallback, useContext, useMemo, useState } from 'react';

import StaticPropsContext from 'contexts/staticProps';
import { alarmPropType } from 'propTypes/alarms';

import Field from 'components/Field';
import Dropdown from 'components/Dropdown';

import './styles.scss';

function Form({ name: _name, source, trigger_condition, trigger_value, type, isEditing, onSubmit }) {
  const { alarmTypes, sources, triggerConditions } = useContext(StaticPropsContext);

  const [name, setName] = useState(_name);
  const [sourceId, setSourceId] = useState(source.id);
  const [alarmTypeId, setAlarmTypeId] = useState(type.id);
  const [triggerConditionId, setTriggerConditionId] = useState(trigger_condition.id);
  const [triggerValue, setTriggerValue] = useState(trigger_value);

  const handleNameChange = useCallback((event) => setName(event.target.value), [setName]);
  const handleSourceIdChange = useCallback((event) => setSourceId(event.target.value), [setSourceId]);
  const handleAlarmTypeIdChange = useCallback((event) => setAlarmTypeId(event.target.value), [setAlarmTypeId]);
  const handleTriggerConditionIdChange = useCallback((event) => setTriggerConditionId(event.target.value), [setTriggerConditionId]);
  const handleTriggerValueChange = useCallback((event) => setTriggerValue(event.target.value), [setTriggerValue]);

  const handleSubmit = () => {
    const data = {
      name,
      sourceId,
      triggerConditionId,
      triggerValue,
      alarmTypeId,
    };
  };

  const mappedSources = useMemo(() => {
    if (sources && sources.length) {
      const newSources = sources.map(source => ({ ...source, displayName: source.name }));
      return newSources;
    }
    return null;
  }, [sources]);

  const mappedAlarmTypes = useMemo(() => {
    if (alarmTypes && alarmTypes.length) {
      return alarmTypes.map(alarmType => ({ ...alarmType, displayName: alarmType.display_name }));
    }
    return null;
  }, [alarmTypes]);

  const mappedTriggerConditions = useMemo(() => {
    if (triggerConditions && triggerConditions.length) {
      return triggerConditions.map(alarmType => ({ ...alarmType, displayName: alarmType.display_name }));
    }
    return null;
  }, [triggerConditions]);

  return (
    <form onSubmit={handleSubmit}>
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__name"
        value={_name}
        onChange={handleNameChange}
        name="alarm-name"
      />
      <Field
        disabled={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__source"
        value={sourceId}
        onChange={handleSourceIdChange}
        component={Dropdown}
        options={mappedSources}
        name="alarm-source-id"
      />
      <Field
        disabled={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-type"
        title={type.description}
        value={alarmTypeId}
        onChange={handleAlarmTypeIdChange}
        component={Dropdown}
        options={mappedAlarmTypes}
        name="alarm-trigger-type-id"
      />
      <Field
        disabled={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-condition"
        value={triggerConditionId}
        component={Dropdown}
        onChange={handleTriggerConditionIdChange}
        options={mappedTriggerConditions}
        name="alarm-trigger-condition-id"
      />
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-value"
        value={triggerValue}
        onChange={handleTriggerValueChange}
        name="alarm-trigger-value"
      />
      <span className="alarm__trigger-unit">%</span>
    </form>
  );
}

Form.propTypes = alarmPropType;

export default Form;
