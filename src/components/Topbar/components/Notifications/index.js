import React, { useMemo } from 'react';
import { useSubscription } from '@apollo/react-hooks';

import ICONS from 'constants/icons';
import ALARM_SUBSCRIPTION_QUERY from 'queries/notification';

import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

import styles from './styles.module.scss';

const namespace = 'notification-button';

function Notifications() {
  const { data, error } = useSubscription(ALARM_SUBSCRIPTION_QUERY);
  // TODO: Get this data from API
  const status = useMemo(() => data?.alarms ? { name: 'on', label: data.alarms.length } : null, [data]);

  if (error) {
    console.error(error);
  }

  return (
    <button className={styles[namespace]}>
      {status && !!data.alarms.length && <StatusIndicator className={styles[`${namespace}__bg`]} status={status} label={data.alarms.length} />}
      <Icon className={styles[`${namespace}__icon`]} name={ICONS.ERROR_OUTLINE} />
    </button>
  );
}

export default Notifications;
