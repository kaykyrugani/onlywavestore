import React from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../contexts/ProdutosContext';
import styles from './ProdutosRelacionados.module.css';

const ProdutosRelacionados = ({ produtoId }) => {
  const { buscarProdutosRelacionados, loading } = useProdutos();
  const produtosRelacionados = buscarProdutosRelacionados(produtoId);

  const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <section className={styles.produtosRelacionados}>
        <h2>Produtos Relacionados</h2>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando produtos relacionados...</p>
        </div>
      </section>
    );
  }

  if (!produtosRelacionados || produtosRelacionados.length === 0) {
    return null;
  }

  return (
    <section className={styles.produtosRelacionados}>
      <h2>Produtos Relacionados</h2>
      <div className={styles.grid}>
        {produtosRelacionados.map(produto => (
          <Link 
            key={produto.id} 
            to={`/produto/${produto.id}`} 
            className={styles.produtoCard}
          >
            <div className={styles.imagemContainer}>
              <img 
                src={produto.imagem} 
                alt={produto.nome} 
                className={styles.imagem}
              />
            </div>
            <div className={styles.info}>
              <h3>{produto.nome}</h3>
              <p className={styles.preco}>
                {formatarPreco(produto.preco)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProdutosRelacionados; 