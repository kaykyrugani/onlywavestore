import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import ProdutoCarrossel from '../../components/ProdutoCarrossel/ProdutoCarrossel';
import ProdutoInfo from '../../components/ProdutoInfo/ProdutoInfo';
import ProdutoAvaliacoes from '../../components/ProdutoAvaliacoes/ProdutoAvaliacoes';
import ProdutosRelacionados from '../../components/ProdutosRelacionados/ProdutosRelacionados';
import { useProdutos } from '../../contexts/ProdutosContext';
import styles from './style.module.css';

const ProdutoPage = () => {
  const { id } = useParams();
  const { buscarProdutoPorId, loading, error } = useProdutos();
  const produto = buscarProdutoPorId(id);

  // Redireciona para página não encontrada se o produto não existir
  if (!loading && !produto) {
    return <Navigate to="*" replace />;
  }

  // Mostra loading enquanto carrega
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando produto...</p>
      </div>
    );
  }

  // Mostra erro se houver
  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.produtoPage}>
      <Header />
      
      <main className={styles.produtoContainer}>
        <div className={styles.produtoGrid}>
          <ProdutoCarrossel images={produto.imagens} />
          <ProdutoInfo produto={produto} />
        </div>

        <ProdutoAvaliacoes />
        <ProdutosRelacionados produtoId={produto.id} />
      </main>

      <Footer />
    </div>
  );
};

export default ProdutoPage; 