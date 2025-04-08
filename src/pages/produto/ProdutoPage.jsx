import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
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
    return <Navigate to="/404" replace />;
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

  // Prepara as imagens para o carrossel
  // Se o produto não tiver imagem, usa uma imagem padrão
  const imagens = produto.imagem 
    ? Array.isArray(produto.imagem) 
      ? produto.imagem 
      : [produto.imagem]
    : ['https://via.placeholder.com/400x400?text=Imagem+não+disponível'];

  // Garante que sempre haverá pelo menos uma imagem
  if (imagens.length === 0) {
    imagens.push('https://via.placeholder.com/400x400?text=Imagem+não+disponível');
  }

  return (
    <div className={styles.produtoPage}>
      <main className={styles.produtoContainer}>
        <div className={styles.produtoGrid}>
          <ProdutoCarrossel images={imagens} />
          <ProdutoInfo produto={produto} />
        </div>

        <ProdutoAvaliacoes />
        <ProdutosRelacionados produtoId={produto.id} />
      </main>
    </div>
  );
};

export default ProdutoPage; 