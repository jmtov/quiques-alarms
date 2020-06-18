import React from 'react';
import { number } from 'prop-types';

import { useDeleteAlarm } from 'hooks/useDeleteAlarm';
import ICONS from 'constants/icons';

import ActionButton from 'components/ActionButton';

// TODO: Better Error handling
function DeleteAlarmButton({ id }) {
  // TODO: Would be better if user had a confirmation for this action.
  const [deleteAlarm, { loading }] = useDeleteAlarm(id);

  return (
    <ActionButton
      icon={ICONS.DELETE}
      disabled={loading}
      title="Delete alarm"
      onClick={deleteAlarm}
      loading={loading}
    />
  );
}

DeleteAlarmButton.propTypes = {
  id: number
};

export default DeleteAlarmButton;
