import React from 'react';

import { cn } from 'utils/style';
import { iconPropType } from 'propTypes/icon';

import styles from './styles.module.scss';

function Icon({ className, name }) {
  return (
    <span className={cn(styles.icon, name, className)} aria-hidden={true} />
  );
}

Icon.propTypes = iconPropType;

export default Icon;
