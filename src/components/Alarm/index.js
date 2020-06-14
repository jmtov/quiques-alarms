import React, { useState } from 'react';

import { alarmPropType } from 'propTypes/alarms';
import { ALARM_STATUS } from 'constants/alarms';
import { useToggleAlarmStatus } from 'hooks/useToggleAlarmStatus';
import { useDeleteAlarm } from 'hooks/useDeleteAlarm';
import ICONS from 'constants/icons';

import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

import Form from './components/Form';
import './styles.scss';

// TODO: Might need to refactor this for a better UX
//       Also check why the list is re-rendering due to "Hooks Changed".
function Alarm({ id, name, source, status, previous_status, trigger_condition, trigger_value, type }) {
  const [toggleAlarm] = useToggleAlarmStatus(id, status.id, previous_status?.id);
  // TODO: Would be better if user had a confirmation for this action.
  const [deleteAlarm] = useDeleteAlarm(id);
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit] = useState(true);
  const [canDelete] = useState(true);
  const [canChangeRunningState] = useState(true);
  const isPaused = status.id === ALARM_STATUS.PAUSED;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDone = () => {
    setIsEditing(false);
  };

  return (
    <div className="alarm">
      <Form
        key={id}
        id={id}
        name={name}
        isEditing={isEditing}
        previous_status={previous_status}
        source={source}
        status={status}
        trigger_condition={trigger_condition}
        trigger_value={trigger_value}
        type={type}
      />
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
          onClick={deleteAlarm}
          title="Delete alarm"
        >
          <Icon name={ICONS.DELETE} />
        </button>
        <button
          className="action-button"
          disabled={!canChangeRunningState}
          onClick={toggleAlarm}
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
