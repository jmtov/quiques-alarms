import React, { useState } from 'react';
import { bool, func, number, oneOfType, string } from 'prop-types';
import { cn } from 'utils/style';

import './styles.scss';

function Field({
  className,
  disabled,
  hideLabel,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  tabIndex,
  title,
  value: initialValue
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = event => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={cn('field', disabled && 'field--disabled', readOnly && 'field--read-only', className)}>
      {hideLabel && (
        <label
          className="field__label"
          htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="field__input"
        disabled={disabled}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        tabIndex={tabIndex}
        title={title}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
}

Field.propTypes = {
  className: string,
  disabled: bool,
  hideLabel: bool,
  label: string,
  name: string,
  onChange: func,
  placeholder: string,
  readOnly: bool,
  tabIndex: number,
  title: string,
  value: oneOfType([number, string])
};

export default Field;
