import React from 'react';

import { alarmPropType } from 'propTypes/alarms';

import './styles.scss';

function Alarm({ name, source, status, trigger_condition, trigger_value, type }) {
  return (
    <div className="alarm">
      <span>{name}</span>
      <span>{source.name}</span>
      <span>{type.name}</span>
      <span>{trigger_condition.name}</span>
      <span>{trigger_value}</span>
      <span>{status.name}</span>
    </div>
  );
}

Alarm.propTypes = alarmPropType;

export default Alarm;
