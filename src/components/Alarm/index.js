import React, { useCallback, useMemo, useState } from 'react';

import { alarmPropType } from 'propTypes/alarms';
import { ALARM_STATUS } from 'constants/alarms';
import { useToggleAlarmStatus } from 'hooks/useToggleAlarmStatus';
import { useDeleteAlarm } from 'hooks/useDeleteAlarm';
import { useUpdateAlarm } from 'hooks/useUpdateAlarm';
import { shallowCompare } from 'utils/helpers';
import ICONS from 'constants/icons';

import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

import Form from './components/Form';
import { FIELDS } from './components/Form/constants';
import './styles.scss';

// TODO: Might need to refactor this for a better UX
//       Also check why the list is re-rendering due to "Hooks Changed".
function Alarm({ id, name, source, status, previous_status, trigger_condition, trigger_value, type }) {
  const [toggleAlarm] = useToggleAlarmStatus(id, status.id, previous_status?.id);
  // TODO: Would be better if user had a confirmation for this action.
  const [deleteAlarm] = useDeleteAlarm(id);
  const [updateAlarm] = useUpdateAlarm(id);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormValues = useMemo(() => {
    return ({
      [FIELDS.NAME.name]: name,
      [FIELDS.SOURCE_ID.name]: source.id,
      [FIELDS.TRIGGER_CONDITION_ID.name]: trigger_condition.id,
      [FIELDS.TRIGGER_VALUE.name]: trigger_value,
      [FIELDS.TYPE_ID.name]: type.id,
    });
  }, [name, source, trigger_condition, trigger_value, type]);

  const isPaused = status.id === ALARM_STATUS.PAUSED;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDone = useCallback((newValues) => {
    const [hasChanged] = shallowCompare(newValues, initialFormValues);
    if (hasChanged) {
      updateAlarm(newValues);
    }
    setIsEditing(false);
  }, [initialFormValues, updateAlarm]);

  return (
    <div className="alarm">
      <StatusIndicator className="alarm__status" status={status} />
      <Form
        id={id}
        initialValues={initialFormValues}
        isEditing={isEditing}
        key={id}
        onSubmit={handleDone}
        onReset={handleCancel}
      />
      {!isEditing && (
        <div className="alarm__actions">
          <>
            <button className="action-button" onClick={handleEdit} title="Edit alarm">
              <Icon name={ICONS.CREATE} />
            </button>
            <button className="action-button" onClick={deleteAlarm} title="Delete alarm">
              <Icon name={ICONS.DELETE} />
            </button>
            <button className="action-button" onClick={toggleAlarm} title={isPaused ? 'Resume alarm' : 'Pause alarm'}>
              <Icon name={isPaused ? ICONS.PLAY_ARROW : ICONS.PAUSE} />
            </button>
          </>
        </div>
      )}
    </div>
  );
}

Alarm.propTypes = alarmPropType;

export default Alarm;
