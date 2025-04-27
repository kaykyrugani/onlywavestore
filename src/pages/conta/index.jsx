import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountHeader from '../../components/AccountHeader';
import AccountForm from '../../components/AccountForm';
import UserDashboard from '../../components/UserDashboard';
import SEO from "../../components/SEO/SEO";
import styles from './Account.module.css';

const AccountPage = ({ initialTab = 'profile' }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Mostrar um indicador de carregamento enquanto verifica o estado de autenticação
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.accountPage}>
      <SEO title={currentUser ? "Minha Conta" : "Entrar ou Cadastrar"} description="Acesse seu perfil, histórico de pedidos ou faça login/cadastro na OnlyWave Store." />
      <AccountHeader />
      <main className={styles.main}>
        {currentUser ? (
          <UserDashboard initialTab={initialTab} />
        ) : (
          <AccountForm redirectTo={location.state?.from?.pathname || '/'} />
        )}
      </main>
      <footer className={styles.footer}>
        <p> {new Date().getFullYear()} Only Wave Store. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AccountPage;