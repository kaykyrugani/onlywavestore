import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = forwardRef(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  const baseClass = 'input';
  const errorClass = error ? 'input--error' : '';
  const disabledClass = disabled ? 'input--disabled' : '';
  const fullWidthClass = fullWidth ? 'input--full-width' : '';
  const iconClass = icon ? `input--icon-${iconPosition}` : '';

  const inputClasses = [
    baseClass,
    errorClass,
    disabledClass,
    fullWidthClass,
    iconClass,
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e) => {
    if (disabled) return;
    onChange?.(e);
  };

  const handleBlur = (e) => {
    if (disabled) return;
    onBlur?.(e);
  };

  return (
    <div className={inputClasses}>
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      
      <div className="input__wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input__icon input__icon--left">{icon}</span>
        )}
        
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="input__field"
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input__icon input__icon--right">{icon}</span>
        )}
      </div>
      
      {(error || helperText) && (
        <span className={`input__message ${error ? 'input__message--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

Input.displayName = 'Input';

export default Input; 