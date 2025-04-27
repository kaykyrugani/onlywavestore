import React, { useEffect, useState } from 'react';
import AccountForm from '../../components/AccountForm';
import SEO from '../../components/SEO/SEO';
import styles from './Cadastro.module.css';

const Register = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    // Forçar o modo de registro no componente AccountForm
    setIsRegisterMode(true);
  }, []);

  return (
    <div className={styles.registerContainer}>
      <SEO
        title="Criar Conta na OnlyWave Store"
        description="Cadastre-se para comprar produtos exclusivos, acompanhar pedidos e aproveitar ofertas especiais na OnlyWave Store."
      />
      <AccountForm initialMode="register" />
    </div>
  );
};

export default Register; 