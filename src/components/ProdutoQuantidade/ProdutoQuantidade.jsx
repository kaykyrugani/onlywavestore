import React from 'react';
import styles from './ProdutoQuantidade.module.css';

const ProdutoQuantidade = ({
  quantidade,
  quantidadeMinima,
  quantidadeMaxima,
  onIncrementar,
  onDecrementar,
  onAtualizar
}) => {
  const handleInputChange = (e) => {
    const valor = e.target.value;
    onAtualizar(valor);
  };

  return (
    <div className={styles.quantidadeContainer}>
      <h3 className={styles.quantidadeTitulo}>Quantidade</h3>
      <div className={styles.quantidadeControles}>
        <button
          className={styles.quantidadeBotao}
          onClick={onDecrementar}
          disabled={quantidade <= quantidadeMinima}
          aria-label="Diminuir quantidade"
        >
          −
        </button>
        <input
          type="number"
          className={styles.quantidadeInput}
          value={quantidade}
          onChange={handleInputChange}
          min={quantidadeMinima}
          max={quantidadeMaxima}
          aria-label="Quantidade"
        />
        <button
          className={styles.quantidadeBotao}
          onClick={onIncrementar}
          disabled={quantidade >= quantidadeMaxima}
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProdutoQuantidade; 