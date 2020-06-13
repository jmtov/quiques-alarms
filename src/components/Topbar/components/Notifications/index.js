import React, { useMemo } from 'react';
import { useSubscription } from '@apollo/react-hooks';

import ICONS from 'constants/icons';

import Icon from 'components/Icon';

import ALARM_SUBSCRIPTION_QUERY from './queries';
import styles from './styles.module.scss';
import StatusIndicator from 'components/StatusIndicator';

const namespace = 'notification-button';

function Notifications() {
  const { data, error } = useSubscription(ALARM_SUBSCRIPTION_QUERY);
  const status = useMemo(() => data?.alarms ? { name: 'on', label: data.alarms.lenfgth } : null, [data]);

  if (error) {
    console.error(error);
  }

  return (
    <button className={styles[namespace]}>
      {status && <StatusIndicator className={styles[`${namespace}__bg`]} status={status} label={data.alarms.length} />}
      <Icon className={styles[`${namespace}__icon`]} name={ICONS.ERROR_OUTLINE} />
    </button>
  );
}

export default Notifications;
