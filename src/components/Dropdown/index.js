import React from 'react';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';

import Icon from 'components/Icon';
import icons from 'constants/icons';

import './styles.scss';

function Dropdown({ className, disabled, id, multiple, name, options, onBlur, onChange, onFocus, value: rawValue }) {
  const value = rawValue === null ? null : rawValue;

  return (
    <>
      <select
        className={`${className} select`}
        defaultValue={value}
        disabled={disabled}
        id={id}
        multiple={multiple}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      >
        {!!options?.length && options.map(option => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.displayName}
          </option>
        ))}
      </select>
      {!disabled && <Icon name={icons.KEYBOARD_ARROW_DOWN} className={'select__icon'} />}
    </>
  );
}

Dropdown.propTypes = {
  className: string,
  disabled: bool,
  id: oneOfType([number, string]),
  multiple: bool,
  name: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
  options: arrayOf(shape),
  value: oneOfType([number, string])
};

export default Dropdown;
