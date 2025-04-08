import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick, disabled }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      loading="lazy"
    >
      {children}
    </button>
  );
};

export default Button; 