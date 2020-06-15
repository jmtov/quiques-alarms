import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { arrayOf, bool, func, element, number, oneOfType, string } from 'prop-types';
import { cn } from 'utils/style';

import './styles.scss';

function Field({
  className,
  component: Component,
  disabled,
  hideLabel,
  id,
  label,
  name,
  onBlur,
  onChange,
  onError,
  onFocus,
  placeholder,
  readOnly,
  tabIndex,
  title,
  validate,
  value: initialValue,
  ...props
}) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState(null);
  const hasErrors = useMemo(() => errors?.some(Boolean), [errors]);

  const handleChange = useCallback(event => {
    setValue(event.target.value);
    if (onChange) onChange({ name: event.target.name, value: event.target.value });
  }, [onChange]);

  const handleBlur = useCallback(event => {
    setIsFocused(false);
    if (onBlur) onBlur(event);
  }, [onBlur]);

  const handleFocus = useCallback(event => {
    setIsFocused(true);
    if (onFocus) onFocus(event);
  }, [onFocus]);

  useEffect(() => {
    if (validate?.length) {
      const fieldErrors = validate.map(validation => validation(value)).filter(Boolean);
      if (onError) onError({ name, errors: fieldErrors.length ? fieldErrors : null });
      setErrors(fieldErrors);
    } else {
      if (onError) onError({ name, errors: null });
    }
  }, [name, onError, value, validate]);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div className={cn(
      'field',
      disabled && 'field--disabled',
      hasErrors && 'field--error',
      readOnly && 'field--read-only',
      isFocused && 'field--focused',
      className
    )}>
      {!hideLabel && label && (
        <label
          className="field__label"
          htmlFor={name}>
          {label}
        </label>
      )}
      <Component
        className="field__input"
        disabled={disabled}
        id={id}
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
      {hasErrors && (
        <div className="field__errors">{errors.join(', ')}</div>
      )}
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
  id: oneOfType([number, string]),
  label: string,
  name: string,
  onBlur: func,
  onChange: func,
  onError: func,
  onFocus: func,
  placeholder: string,
  readOnly: bool,
  tabIndex: number,
  title: string,
  validate: arrayOf(func),
  value: oneOfType([number, string])
};

export default Field;
