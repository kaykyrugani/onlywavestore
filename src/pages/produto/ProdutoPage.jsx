import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProdutoCarrossel from '../../components/ProdutoCarrossel/ProdutoCarrossel';
import ProdutoInfo from '../../components/ProdutoInfo/ProdutoInfo';
import AvaliacaoModal from '../../components/AvaliacaoModal/AvaliacaoModal';
import { useProdutos } from '../../contexts/ProdutosContext';
import styles from './style.module.css';

const ProdutoPage = () => {
  const { id } = useParams();
  const { buscarProdutoPorId, loading, error } = useProdutos();
  const produto = buscarProdutoPorId(id);
  const [showAvaliacaoModal, setShowAvaliacaoModal] = useState(false);

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

  const handleAvaliacaoSubmit = (avaliacao) => {
    // Aqui você implementaria a lógica para salvar a avaliação
    console.log('Avaliação submetida:', avaliacao);
    setShowAvaliacaoModal(false);
  };

  return (
    <div className={styles.produtoPage}>
      <main className={styles.produtoContainer}>
        <div className={styles.produtoGrid}>
          <div className={styles.produtoCarrossel}>
            <ProdutoCarrossel images={imagens} />
          </div>
          <div className={styles.produtoImagemPrincipal}>
            <img src={imagens[0]} alt={produto.nome} />
          </div>
          <div className={styles.produtoInfo}>
            <ProdutoInfo produto={produto} />
          </div>
        </div>

        <div className={styles.produtoSections}>
          <section className={styles.section}>
            <h2>Descrição do Produto</h2>
            <p>
              Este produto excepcional combina estilo contemporâneo com conforto incomparável. 
              Fabricado com materiais de alta qualidade, cada peça é cuidadosamente produzida 
              para garantir durabilidade e satisfação. O design versátil se adapta perfeitamente 
              a diferentes ocasiões, enquanto os detalhes refinados demonstram o compromisso 
              com a excelência. Ideal para quem busca qualidade premium e estilo atemporal.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Qualidade</h2>
            <p>Nossos produtos são fabricados com os melhores materiais, garantindo durabilidade e conforto.</p>
          </section>

          <section className={styles.section}>
            <h2>Troca e Devolução</h2>
            <p>Você tem até 30 dias para realizar a troca ou devolução do produto, desde que ele esteja em perfeito estado e com a etiqueta.</p>
          </section>

          <section className={styles.avaliacaoSection}>
            <h2>Avaliar Produto</h2>
            <p>Compartilhe sua experiência com outros clientes.</p>
            <button 
              className={styles.reviewButton}
              onClick={() => setShowAvaliacaoModal(true)}
            >
              Escrever Avaliação
            </button>
          </section>
        </div>
      </main>

      <AvaliacaoModal
        isOpen={showAvaliacaoModal}
        onClose={() => setShowAvaliacaoModal(false)}
        onSubmit={handleAvaliacaoSubmit}
      />
    </div>
  );
};

export default ProdutoPage; 