import React from 'react';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';

import Icon from 'components/Icon';
import icons from 'constants/icons';

import './styles.scss';

function Dropdown({ className, disabled, name, options, onBlur, onChange, onFocus, value }) {
  return (
    <>
      <select
        className={`${className} select`}
        disabled={disabled}
        name={name}
        id={name}
        defaultValue={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      >
        {!!options?.length && options.map(option => (
          <option key={option.id} value={option.id}>{option.displayName}</option>
        ))}
      </select>
      {!disabled && <Icon name={icons.KEYBOARD_ARROW_DOWN} className={'select__icon'} />}
    </>
  );
}

Dropdown.propTypes = {
  className: string,
  disabled: bool,
  name: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
  options: arrayOf(shape),
  value: oneOfType([number, string])
};

export default Dropdown;
