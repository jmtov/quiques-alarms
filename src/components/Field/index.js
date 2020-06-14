import React, { useState } from 'react';
import { bool, func, element, number, oneOfType, string } from 'prop-types';
import { cn } from 'utils/style';

import './styles.scss';

function Field({
  className,
  component: Component,
  disabled,
  hideLabel,
  label,
  name,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  readOnly,
  tabIndex,
  title,
  value: initialValue,
  ...props
}) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = event => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  const handleBlur = event => {
    setIsFocused(false);
    if (onBlur) onBlur(event);
  };

  const handleFocus = event => {
    setIsFocused(true);
    if (onFocus) onFocus(event);
  };

  return (
    <div className={cn('field', disabled && 'field--disabled', readOnly && 'field--read-only', isFocused && 'field--focused', className)}>
      {hideLabel && (
        <label
          className="field__label"
          htmlFor={name}>
          {label}
        </label>
      )}
      <Component
        className="field__input"
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        tabIndex={tabIndex}
        title={title}
        readOnly={readOnly}
        value={value}
        {...props}
      />
    </div>
  );
}

Field.defaultProps = {
  component: 'input',
};

Field.propTypes = {
  className: string,
  component: oneOfType([element, func, string]),
  disabled: bool,
  hideLabel: bool,
  label: string,
  name: string,
  onChange: func,
  onBlur: func,
  onFocus: func,
  placeholder: string,
  readOnly: bool,
  tabIndex: number,
  title: string,
  value: oneOfType([number, string])
};

export default Field;
