import React from 'react';
import { number } from 'prop-types';

import { useDeleteAlarm } from 'hooks/useDeleteAlarm';
import ICONS from 'constants/icons';

import ActionButton from 'components/ActionButton';

function DeleteAlarmButton({ id }) {
  // TODO: Would be better if user had a confirmation for this action.
  const [deleteAlarm, { error, loading }] = useDeleteAlarm(id);

  return (
    <ActionButton icon={ICONS.DELETE} title="Delete alarm" onClick={deleteAlarm} loading={loading}>
      {error && <span>error</span>}
    </ActionButton>
  );
}

DeleteAlarmButton.propTypes = {
  id: number
};

export default DeleteAlarmButton;
