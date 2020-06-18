import React from 'react';
import { number } from 'prop-types';

import { useToggleAlarmStatus } from 'hooks/useToggleAlarmStatus';
import { ALARM_STATUS } from 'constants/alarms';
import ICONS from 'constants/icons';

import ActionButton from 'components/ActionButton';

// TODO: Better Error Handling
function PauseAlarmButton({ id, statusId, previousStatusId }) {
  const [toggleAlarm, { loading }] = useToggleAlarmStatus(id, statusId, previousStatusId);
  const isPaused = statusId === ALARM_STATUS.PAUSED;

  return (
    <ActionButton
      disabled={loading}
      loading={loading}
      icon={isPaused ? ICONS.PLAY_ARROW : ICONS.PAUSE}
      title={isPaused ? 'Resume alarm' : 'Pause alarm'}
      onClick={toggleAlarm}
    />
  );
}

PauseAlarmButton.propTypes = {
  id: number,
  previousStatusId: number,
  statusId: number,
};

export default PauseAlarmButton;
