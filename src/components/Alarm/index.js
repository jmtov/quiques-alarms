import React, { useState } from 'react';

import { alarmPropType } from 'propTypes/alarms';
import ICONS from 'constants/icons';

import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

import './styles.scss';
import Field from 'components/Field';

function Alarm({ name, source, status, trigger_condition, trigger_value, type }) {
  const [isEditing] = useState(false);
  const [canEdit] = useState(false);
  const [canDelete] = useState(false);
  const [canPause] = useState(false);

  return (
    <div className="alarm">
      <Field readOnly={!isEditing} tabIndex={isEditing ? 0 : -1 } className="alarm__name" value={name} />
      <Field readOnly={!isEditing} tabIndex={isEditing ? 0 : -1 } className="alarm__source" value={source.name} />
      <Field readOnly={!isEditing} tabIndex={isEditing ? 0 : -1 } className="alarm__type" title={'What'} value={type.name} />
      <div className="alarm__trigger">
        <Field readOnly={!isEditing} tabIndex={isEditing ? 0 : -1 } className="trigger__condition" value={trigger_condition.name} />
        <Field readOnly={!isEditing} tabIndex={isEditing ? 0 : -1 } className="trigger__value" value={trigger_value} />
      </div>
      <StatusIndicator status={status} />
      <div className="alarm__actions">
        <button disabled={!canEdit} title="Edit alarm" className="action-button"><Icon name={ICONS.CREATE} /></button>
        <button disabled={!canDelete} title="Delete alarm" className="action-button"><Icon name={ICONS.DELETE} /></button>
        <button disabled={!canPause} title="Pause alarm" className="action-button"><Icon name={ICONS.PAUSE} /></button>
      </div>
    </div>
  );
}

Alarm.propTypes = alarmPropType;

export default Alarm;
