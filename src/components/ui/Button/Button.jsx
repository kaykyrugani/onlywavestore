import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClass = 'button';
  const variantClass = `button--${variant}`;
  const sizeClass = `button--${size}`;
  const widthClass = fullWidth ? 'button--full-width' : '';
  const stateClass = disabled ? 'button--disabled' : '';
  const loadingClass = loading ? 'button--loading' : '';
  const iconClass = icon ? `button--icon-${iconPosition}` : '';

  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    stateClass,
    loadingClass,
    iconClass,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="button__loader" />}
      {icon && iconPosition === 'left' && <span className="button__icon">{icon}</span>}
      <span className="button__content">{children}</span>
      {icon && iconPosition === 'right' && <span className="button__icon">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button; 