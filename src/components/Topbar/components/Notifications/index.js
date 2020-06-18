import React, { useMemo } from 'react';
import { useSubscription } from '@apollo/react-hooks';

import ICONS from 'constants/icons';
import ALARM_SUBSCRIPTION_QUERY from 'queries/notification';

import ActionButton from 'components/ActionButton';
import StatusIndicator from 'components/StatusIndicator';

import styles from './styles.module.scss';

const namespace = 'notification-button';

// Better Error Handling
function Notifications() {
  const { data } = useSubscription(ALARM_SUBSCRIPTION_QUERY);
  // TODO: Get this data from API
  const status = useMemo(() => data?.alarms ? { name: 'on', label: data.alarms.length } : null, [data]);

  return (
    <ActionButton className={styles[namespace]} icon={ICONS.ERROR_OUTLINE}>
      {status && !!data.alarms.length && (
        <StatusIndicator
          className={styles[`${namespace}__bg`]}
          status={status}
          label={data.alarms.length}
        />
      )}
    </ActionButton>
  );
}

export default Notifications;
