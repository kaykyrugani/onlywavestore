import React from 'react';
import styles from './ProdutoAdicionarSacola.module.css';

const ProdutoAdicionarSacola = ({
  podeAdicionar,
  erro,
  onAdicionarSacola
}) => {
  return (
    <div className={styles.adicionarContainer}>
      {erro && <p className={styles.erroMensagem}>{erro}</p>}
      <button
        className={`${styles.adicionarBotao} ${!podeAdicionar ? styles.desabilitado : ''}`}
        onClick={onAdicionarSacola}
        disabled={!podeAdicionar}
        aria-label="Adicionar à sacola"
      >
        Adicionar à sacola
      </button>
    </div>
  );
};

export default ProdutoAdicionarSacola; 