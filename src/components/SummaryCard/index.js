import React, { useMemo } from 'react';
import { useSubscription } from '@apollo/react-hooks';

import { SUMMARY_QUERY } from 'queries/dashboard';

import Loading from 'components/Loading';
import Errored from 'components/Errored';

import './styles.scss';

function SummaryCard() {
  const { data, loading, error } = useSubscription(SUMMARY_QUERY);
  const alarmsOn = useMemo(() => data?.alarms.filter(alarm => alarm.status_id === 1), [data]);

  if (error) return <Errored message="Something happened" />;
  if (loading) return <Loading />;

  return (
    <div className="summary-card">
      {data && (
        <>
          <h1 className="summary-card__title">{`${alarmsOn.length} / ${data.alarms?.length}`}</h1>
          <h3 className="summary-card__subtitle">Alarms turned on </h3>
        </>
      )}
    </div>
  );
}

export default SummaryCard;
