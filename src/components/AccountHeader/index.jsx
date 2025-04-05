import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import styles from './AccountHeader.module.css';

const AccountHeader = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" aria-label="Voltar para a página inicial">
            <h3>Only Wave</h3>
          </Link>
        </div>
        <div className={styles.securityInfo} aria-live="polite">
          <FaLock className={styles.lockIcon} aria-hidden="true" />
          <h4 id="security-message">100% seguro</h4>
        </div>
      </div>
    </header>
  );
};

export default AccountHeader;
