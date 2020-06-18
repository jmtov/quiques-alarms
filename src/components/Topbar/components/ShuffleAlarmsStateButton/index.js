import React from 'react';
import { string } from 'prop-types';

import ICONS from 'constants/icons';
import { useShuffleAlarms } from 'hooks/useShuffleAlarms';

import ActionButton from 'components/ActionButton';

function ShuffleAlarmsStateButton({ className }) {
  const [shuffleAlarms, { loading, error }] = useShuffleAlarms();

  const handleClick = () => {
    if (!loading) {
      shuffleAlarms();
    }
  };

  return (
    <ActionButton
      className={className}
      disabled={loading}
      error={error}
      icon={ICONS.SHUFFLE}
      loading={loading}
      onClick={handleClick}
    />
  );
}

ShuffleAlarmsStateButton.propTypes = {
  className: string
};

export default ShuffleAlarmsStateButton;
