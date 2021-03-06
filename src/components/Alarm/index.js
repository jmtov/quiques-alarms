import React, { useCallback, useMemo, useState, useEffect } from 'react';

import ICONS from 'constants/icons';
import { alarmPropType } from 'propTypes/alarms';
import { useUpdateAlarm } from 'hooks/useUpdateAlarm';

import ActionButton from 'components/ActionButton';
import AlarmForm from 'components/AlarmForm';
import { FIELDS } from 'components/AlarmForm/constants';
import StatusIndicator from 'components/StatusIndicator';

import DeleteAlarmButton from './components/DeleteAlarmButton';
import PauseAlarmButton from './components/PauseAlarmButton';
import './styles.scss';

function Alarm({ id, name, source, status, previous_status, trigger_condition, trigger_value, type }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateAlarm, { done, error, loading }] = useUpdateAlarm(id);

  const initialFormValues = useMemo(() => {
    return ({
      [FIELDS.NAME.name]: name,
      [FIELDS.SOURCE_ID.name]: source.id,
      [FIELDS.TRIGGER_CONDITION_ID.name]: trigger_condition.id,
      [FIELDS.TRIGGER_VALUE.name]: trigger_value,
      [FIELDS.TYPE_ID.name]: type.id,
    });
  }, [name, source, trigger_condition, trigger_value, type]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDone = useCallback(values => {
    updateAlarm(values);
  }, [updateAlarm]);

  useEffect(() => {
    if (done) {
      setIsEditing(false);
    }
  }, [done]);

  return (
    <div className="alarm">
      <StatusIndicator className="alarm__status" status={status} label={status.name.toUpperCase()} />
      <AlarmForm
        className="alarm__form"
        id={id}
        initialValues={initialFormValues}
        isEditing={isEditing}
        submitError={error}
        submitLoading={loading}
        key={id}
        onSubmit={handleDone}
        onReset={handleCancel}
      />
      {!isEditing && (
        <div className="alarm__actions">
          <ActionButton onClick={handleEdit} title="Edit alarm" icon={ICONS.CREATE} />
          <DeleteAlarmButton id={id} />
          <PauseAlarmButton id={id} statusId={status.id} previousStatusId={previous_status?.id} />
        </div>
      )}
    </div>
  );
}

Alarm.propTypes = alarmPropType;

export default React.memo(Alarm);
