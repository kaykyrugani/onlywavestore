import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, className = '', fluid = false, ...props }) => {
  return (
    <div 
      className={`${styles.container} ${fluid ? styles.fluid : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
