import React from 'react';
import styles from './ProdutoTamanho.module.css';

const ProdutoTamanho = ({ 
  tamanhos, 
  tamanhoSelecionado, 
  onSelecionarTamanho 
}) => {
  return (
    <div className={styles.tamanhoContainer}>
      <h3 className={styles.tamanhoTitulo}>Tamanho</h3>
      <div className={styles.tamanhoBotoes}>
        {tamanhos.map((tamanho) => (
          <button
            key={tamanho}
            className={`${styles.tamanhoBotao} ${tamanhoSelecionado === tamanho ? styles.selecionado : ''}`}
            onClick={() => onSelecionarTamanho(tamanho)}
            aria-label={`Selecionar tamanho ${tamanho}`}
            aria-pressed={tamanhoSelecionado === tamanho}
          >
            {tamanho}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProdutoTamanho; 