import React, { useState } from 'react';
import styles from './ProdutoAvaliacoes.module.css';

const ProdutoAvaliacoes = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [avaliacao, setAvaliacao] = useState({
    nome: '',
    nota: 5,
    comentario: ''
  });
  const [avaliacoes, setAvaliacoes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simula o envio da avaliação
    console.log('Avaliação enviada:', avaliacao);
    
    // Adiciona a avaliação à lista
    setAvaliacoes([...avaliacoes, { ...avaliacao, data: new Date() }]);
    
    // Reseta o formulário
    setAvaliacao({
      nome: '',
      nota: 5,
      comentario: ''
    });
    
    // Fecha o modal
    setModalAberto(false);
  };

  const renderEstrelas = (nota) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`${styles.estrela} ${index < nota ? styles.ativa : ''}`}
        onClick={() => setAvaliacao({ ...avaliacao, nota: index + 1 })}
        aria-label={`${index + 1} estrelas`}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
      </button>
    ));
  };

  return (
    <section className={styles.avaliacoesContainer}>
      <h2>Avaliações</h2>

      {avaliacoes.length === 0 ? (
        <div className={styles.semAvaliacoes}>
          <p>Este produto ainda não possui avaliações.</p>
          <button 
            className={styles.avaliarButton}
            onClick={() => setModalAberto(true)}
          >
            Avaliar produto
          </button>
        </div>
      ) : (
        <div className={styles.avaliacoesList}>
          {avaliacoes.map((av, index) => (
            <div key={index} className={styles.avaliacaoItem}>
              <div className={styles.avaliacaoHeader}>
                <h3>{av.nome}</h3>
                <div className={styles.estrelas}>
                  {renderEstrelas(av.nota)}
                </div>
                <span className={styles.data}>
                  {new Date(av.data).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className={styles.comentario}>{av.comentario}</p>
            </div>
          ))}
          <button 
            className={styles.avaliarButton}
            onClick={() => setModalAberto(true)}
          >
            Adicionar avaliação
          </button>
        </div>
      )}

      {modalAberto && (
        <div className={styles.modalOverlay} onClick={() => setModalAberto(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button 
              className={styles.fecharModal}
              onClick={() => setModalAberto(false)}
              aria-label="Fechar modal"
            >
              ×
            </button>
            <h3>Avaliar Produto</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  value={avaliacao.nome}
                  onChange={e => setAvaliacao({ ...avaliacao, nome: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Nota</label>
                <div className={styles.estrelas}>
                  {renderEstrelas(avaliacao.nota)}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="comentario">Comentário</label>
                <textarea
                  id="comentario"
                  value={avaliacao.comentario}
                  onChange={e => setAvaliacao({ ...avaliacao, comentario: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className={styles.enviarButton}>
                Enviar avaliação
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProdutoAvaliacoes; 