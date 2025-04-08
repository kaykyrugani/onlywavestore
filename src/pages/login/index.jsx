import React from 'react';
import AccountForm from '../../components/AccountForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <AccountForm />
    </div>
  );
};

export default Login; 