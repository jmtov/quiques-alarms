import React from 'react';

import ICONS from 'constants/icons';
import { useShuffleAlarms } from 'hooks/useShuffleAlarms';

import ActionButton from 'components/ActionButton';

// TODO: Improve loading and error handling
function ShuffleAlarmsStateButton() {
  const [shuffleAlarms, { error, loading }] = useShuffleAlarms();

  const handleClick = () => {
    if (!loading) {
      shuffleAlarms();
    }
  };

  return (
    <ActionButton disabled={loading} loading={loading} icon={ICONS.SHUFFLE} onClick={handleClick}>
      {error && <span>{error}</span>}
    </ActionButton>
  );
}

export default ShuffleAlarmsStateButton;
