import React, { useEffect, useState } from 'react';
import AccountForm from '../../components/AccountForm';
import styles from './Cadastro.module.css';

const Register = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    // Forçar o modo de registro no componente AccountForm
    setIsRegisterMode(true);
  }, []);

  return (
    <div className={styles.registerContainer}>
      <AccountForm initialMode="register" />
    </div>
  );
};

export default Register; 