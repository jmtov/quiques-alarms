import React from 'react';
import { bool, func, node, number, oneOf, shape, string } from 'prop-types';

import { cn } from 'utils/style';
import { errorPropTypes } from 'propTypes/common';
import ICONS from 'constants/icons';

import Icon from 'components/Icon';
import styles from './styles.module.scss';

const namespace = 'button';

function ActionButton({ className, children, disabled, error, icon, onClick, loading, title, type}) {
  const handleClick = event => {
    if (onClick) onClick(event);
  };

  return (
    <button
      disabled={disabled}
      className={cn(styles[namespace], loading && styles[`${namespace}--loading`], className)}
      onClick={handleClick}
      title={title}
      type={type}
    >
      <Icon name={icon} />
      {children}
      {error && <span className={styles[`${namespace}__error`]}>{error.message}</span>}
    </button>
  );
}

ActionButton.propTypes = {
  className: string,
  children: node,
  disabled: bool,
  error: shape(errorPropTypes),
  icon: oneOf(Object.values(ICONS)),
  id: number,
  loading: bool,
  onClick: func,
  title: string,
  type: string,
};

export default ActionButton;
