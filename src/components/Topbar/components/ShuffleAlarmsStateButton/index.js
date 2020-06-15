import React from 'react';

import ICONS from 'constants/icons';
import { useShuffleAlarms } from 'hooks/useShuffleAlarms';

import Icon from 'components/Icon';

import styles from './styles.module.scss';

const namespace = 'shuffle-button';

function ShuffleAlarmsStateButton() {
  const [shuffleAlarms, { loading }] = useShuffleAlarms();
  console.log(loading);

  const handleClick = () => {
    if (!loading) {
      shuffleAlarms();
    }
  };

  return (
    <button className={styles[namespace]} onClick={handleClick} disabled={loading}>
      <Icon className={styles[`${namespace}__icon`]} name={ICONS.SHUFFLE} />
    </button>
  );
}

export default ShuffleAlarmsStateButton;
