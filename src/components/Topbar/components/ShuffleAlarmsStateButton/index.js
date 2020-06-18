import React from 'react';
import { string } from 'prop-types';

import ICONS from 'constants/icons';
import { useShuffleAlarms } from 'hooks/useShuffleAlarms';

import ActionButton from 'components/ActionButton';

// TODO: Improve loading and error handling
function ShuffleAlarmsStateButton({ className }) {
  const [shuffleAlarms, { loading }] = useShuffleAlarms();

  const handleClick = () => {
    if (!loading) {
      shuffleAlarms();
    }
  };

  return (
    <ActionButton
      className={className}
      disabled={loading}
      loading={loading}
      icon={ICONS.SHUFFLE}
      onClick={handleClick}
    />
  );
}

ShuffleAlarmsStateButton.propTypes = {
  className: string
};

export default ShuffleAlarmsStateButton;
