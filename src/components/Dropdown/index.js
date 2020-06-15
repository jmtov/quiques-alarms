import React from 'react';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';

import Icon from 'components/Icon';
import icons from 'constants/icons';

import './styles.scss';

function Dropdown({ className, disabled, id, multiple, name, options, onBlur, onChange, onFocus, value }) {
  return (
    <>
      <select
        className={`${className} select`}
        defaultValue={value || null}
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
            // disabled={!Number.isFinite(option.id)}
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
