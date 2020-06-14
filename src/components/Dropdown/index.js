import React from 'react';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';

function Dropdown({ className, disabled, name, options, onChange, value }) {
  return (
    <select className={className} disabled={disabled} name={name} id={name} defaultValue={value} onChange={onChange}>
      {!!options?.length && options.map(option => (
        <option key={option.id} value={option.id}>{option.displayName}</option>
      ))}
    </select>
  );
}

Dropdown.propTypes = {
  className: string,
  disabled: bool,
  name: string,
  onChange: func,
  options: arrayOf(shape),
  value: oneOfType([number, string])
};

export default Dropdown;
