import React from 'react';

import { statusPropType } from 'propTypes/alarms';
import { cn } from 'utils/style';

import './styles.scss';

function StatusIndicator({ className, status, label }) {
  return (
    <div className={cn(`status status--${status.name}`, className)} title={status.description} tabIndex={0}>
      {label && <span className="status__label">{label}</span>}
      {status.description && <span className="status__tooltip">{status.description}</span>}
    </div>
  );
}

StatusIndicator.propTypes = statusPropType;

export default StatusIndicator;
