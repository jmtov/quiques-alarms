import React from 'react';
import { number } from 'prop-types';

import { useDeleteAlarm } from 'hooks/useDeleteAlarm';
import ICONS from 'constants/icons';

import ActionButton from 'components/ActionButton';

function DeleteAlarmButton({ id }) {
  // Would be better if user had a confirmation for this action.
  const [deleteAlarm, { loading, error }] = useDeleteAlarm(id);

  return (
    <ActionButton
      disabled={loading}
      error={error}
      icon={ICONS.DELETE}
      loading={loading}
      onClick={deleteAlarm}
      title="Delete alarm"
    />
  );
}

DeleteAlarmButton.propTypes = {
  id: number
};

export default DeleteAlarmButton;
