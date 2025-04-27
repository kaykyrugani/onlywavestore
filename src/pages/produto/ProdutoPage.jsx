import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import ProdutoCarrossel from '../../components/ProdutoCarrossel/ProdutoCarrossel';
import ProdutoInfo from '../../components/ProdutoInfo/ProdutoInfo';
import AvaliacaoModal from '../../components/AvaliacaoModal/AvaliacaoModal';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton';
import SEO from '../../components/SEO/SEO';
import styles from './style.module.css';

const fetcher = url => axios.get(url).then(res => res.data);

const ProdutoPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [showAvaliacaoModal, setShowAvaliacaoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: produto, error, isLoading } = useSWR(
    `/api/produtos/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  );

  if (isLoading) {
    return <LoadingSkeleton type="produto" />;
  }

  if (error) {
    toast.error('Erro ao carregar produto');
    return <Navigate to="/404" replace />;
  }

  if (!produto) {
    return <Navigate to="/404" replace />;
  }

  const imagens = produto.imagens || ['/assets/placeholder.png'];

  const handleAddToCart = () => {
    addToCart(produto);
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleAvaliacaoSubmit = async (avaliacao) => {
    try {
      await axios.post(`/api/produtos/${id}/avaliacoes`, avaliacao);
      toast.success('Avaliação enviada com sucesso!');
      setShowAvaliacaoModal(false);
    } catch (error) {
      toast.error('Erro ao enviar avaliação');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.produtoPage}
    >
      <SEO 
        title={produto.nome ? produto.nome : 'Produto'}
        description={produto.descricao ? produto.descricao : 'Veja detalhes do produto na OnlyWave Store.'}
        ogImage={imagens[0]}
        canonicalUrl={`https://onlywave.com.br/produto/${id}`}
      />
      <main className={styles.produtoContainer}>
        <motion.div 
          className={styles.produtoGrid}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.produtoCarrossel}>
            <ProdutoCarrossel 
              images={imagens}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
          </div>

          <div className={styles.produtoInfo}>
            <ProdutoInfo 
              produto={produto}
              onAddToCart={handleAddToCart}
            />
          </div>
        </motion.div>

        <motion.div 
          className={styles.produtoSections}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <section className={styles.section}>
            <h2>Descrição do Produto</h2>
            <p>{produto.descricao}</p>
          </section>

          <section className={styles.section}>
            <h2>Especificações</h2>
            <ul className={styles.especificacoes}>
              {produto.especificacoes?.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.nome}:</strong> {spec.valor}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Garantia</h2>
            <p>{produto.garantia || 'Garantia de 30 dias contra defeitos de fabricação.'}</p>
          </section>

          <section className={styles.avaliacaoSection}>
            <h2>Avaliações</h2>
            <div className={styles.avaliacoesList}>
              {produto.avaliacoes?.map((avaliacao, index) => (
                <div key={index} className={styles.avaliacaoItem}>
                  <div className={styles.avaliacaoHeader}>
                    <span className={styles.avaliacaoNome}>{avaliacao.usuario}</span>
                    <span className={styles.avaliacaoData}>
                      {new Date(avaliacao.data).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.avaliacaoNota}>
                    {'★'.repeat(avaliacao.nota)}{'☆'.repeat(5 - avaliacao.nota)}
                  </div>
                  <p className={styles.avaliacaoTexto}>{avaliacao.comentario}</p>
                </div>
              ))}
            </div>
            <button 
              className={styles.writeReviewBtn}
              onClick={() => setShowAvaliacaoModal(true)}
            >
              Escrever Avaliação
            </button>
          </section>
        </motion.div>
      </main>

      <AvaliacaoModal
        isOpen={showAvaliacaoModal}
        onClose={() => setShowAvaliacaoModal(false)}
        onSubmit={handleAvaliacaoSubmit}
      />
    </motion.div>
  );
};

export default ProdutoPage; 