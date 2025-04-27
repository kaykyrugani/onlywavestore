import React from 'react';
import AccountForm from '../../components/AccountForm';
import SEO from '../../components/SEO/SEO';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <SEO 
        title="Entrar na OnlyWave Store" 
        description="Faça login para acessar sua conta, acompanhar pedidos e aproveitar ofertas exclusivas na OnlyWave Store." 
      />
      <AccountForm />
    </div>
  );
};

export default Login; 