import React, { useState } from 'react';

import { alarmPropType } from 'propTypes/alarms';
import { ALARM_STATUS } from 'constants/alarms';
import { useToggleAlarmStatus } from 'hooks/useToggleAlarmStatus';
import ICONS from 'constants/icons';

import Icon from 'components/Icon';
import Field from 'components/Field';
import StatusIndicator from 'components/StatusIndicator';

import './styles.scss';


// TODO: Might need to refactor this for a better UX
function Alarm({ id, name, source, status, previous_status, trigger_condition, trigger_value, type }) {
  const [toggleAlarm] = useToggleAlarmStatus(id, status, previous_status);
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit] = useState(false);
  const [canDelete] = useState(false);
  const [canChangeRunningState] = useState(true);
  const isPaused = status.id === ALARM_STATUS.PAUSED;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log(id);
  };

  const handleDone = () => {
    setIsEditing(false);
  };

  const togglePausedState = () => {
    toggleAlarm();
  };

  return (
    <div className="alarm">
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__name"
        value={name}
      />
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__source"
        value={source.name}
      />
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-type"
        title={type.description}
        value={type.display_name}
      />
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-condition"
        value={trigger_condition.display_name}
      />
      <Field
        readOnly={!isEditing}
        tabIndex={isEditing ? 0 : -1 }
        className="alarm__trigger-value"
        value={trigger_value}
      />
      <span className="alarm__trigger-unit">%</span>
      <StatusIndicator className="alarm__status" status={status} />
      <div className="alarm__actions">
        {isEditing ? (
          <button
            className="action-button"
            disabled={!canEdit}
            onClick={handleDone}
            title="Edit alarm"
          >
            <Icon name={ICONS.DONE} />
          </button>
        ) : (
          <button
            className="action-button"
            disabled={!canEdit}
            onClick={handleEdit}
            title="Edit alarm"
          >
            <Icon name={ICONS.CREATE} />
          </button>
        )
        }
        <button
          className="action-button"
          disabled={!canDelete}
          onClick={handleDelete}
          title="Delete alarm"
        >
          <Icon name={ICONS.DELETE} />
        </button>
        <button
          className="action-button"
          disabled={!canChangeRunningState}
          onClick={togglePausedState}
          title={isPaused ? 'Resume alarm' : 'Pause alarm'}
        >
          <Icon name={isPaused ? ICONS.PLAY_ARROW : ICONS.PAUSE} />
        </button>
      </div>
    </div>
  );
}

Alarm.propTypes = alarmPropType;

export default Alarm;
