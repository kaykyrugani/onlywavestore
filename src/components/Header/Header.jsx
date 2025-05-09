import React from 'react';
import styles from './Header.module.css';
import { useCarrinho } from '../../contexts/CarrinhoContext';

const Header = () => {
  const { totalItens } = useCarrinho();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo} aria-label="Página inicial OnlyWave">
          OnlyWave
        </a>

        <nav className={styles.nav} aria-label="Menu principal">
          <a href="/produtos" className={styles.navLink} aria-label="Ver produtos">Produtos</a>
          <a href="/sobre" className={styles.navLink} aria-label="Sobre a OnlyWave">Sobre</a>
          <a href="/contato" className={styles.navLink} aria-label="Contato da OnlyWave">Contato</a>
        </nav>

        <div className={styles.actions} role="group" aria-label="Ações do usuário">
          <button className={styles.searchButton} aria-label="Buscar produtos">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <a href="/sacola" className={styles.cartButton} aria-label="Ir para sacola de compras">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalItens > 0 && (
              <span className={styles.cartCount} aria-label={`Quantidade de itens no carrinho: ${totalItens}`}>{totalItens}</span>
            )}
          </a>

          <button className={styles.menuButton} aria-label="Abrir menu de navegação">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16m-16 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
    </header>
  );
};

export default Header; 