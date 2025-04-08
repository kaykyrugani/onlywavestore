import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <main className={styles.notFoundContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Página não encontrada</h2>
          <p className={styles.message}>
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              Voltar para a página inicial
            </Link>
            <Link to="/produtos" className={styles.productsButton}>
              Ver produtos
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage; 