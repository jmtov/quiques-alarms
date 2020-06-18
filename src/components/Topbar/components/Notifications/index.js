import React, { useMemo } from 'react';
import { useSubscription } from '@apollo/react-hooks';

import ICONS from 'constants/icons';
import ALARM_SUBSCRIPTION_QUERY from 'queries/notification';

import ActionButton from 'components/ActionButton';
import StatusIndicator from 'components/StatusIndicator';

import styles from './styles.module.scss';

const namespace = 'notification-button';

function Notifications() {
  const { data, loading, error } = useSubscription(ALARM_SUBSCRIPTION_QUERY);
  const status = useMemo(() => data?.alarms ? { name: 'on', label: data.alarms.length } : null, [data]);

  return (
    <ActionButton className={styles[namespace]} icon={ICONS.ERROR_OUTLINE} error={error} loading={loading}>
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
