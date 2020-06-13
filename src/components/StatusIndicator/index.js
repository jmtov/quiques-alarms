import React from 'react';

import { statusPropType } from 'propTypes/alarms';
import { cn } from 'utils/style';

import './styles.scss';

function StatusIndicator({ className, status }) {
  return (
    <div className={cn(`status status--${status.name.toLowerCase()}`, className)} title={status.description} />
  );
}

StatusIndicator.propTypes = statusPropType;

export default StatusIndicator;
