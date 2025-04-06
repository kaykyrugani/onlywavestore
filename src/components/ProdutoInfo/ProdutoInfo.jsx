import React, { useState } from 'react';
import styles from './ProdutoInfo.module.css';
import ProdutoTamanho from '../ProdutoTamanho/ProdutoTamanho';
import ProdutoQuantidade from '../ProdutoQuantidade/ProdutoQuantidade';
import ProdutoAdicionarSacola from '../ProdutoAdicionarSacola/ProdutoAdicionarSacola';
import Toast from '../Toast/Toast';
import useProdutoSelecao from '../../hooks/useProdutoSelecao';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import ParcelamentoModal from '../ParcelamentoModal/ParcelamentoModal';

const ProdutoInfo = ({ produto }) => {
  const [toast, setToast] = useState(null);
  const { adicionarItem } = useCarrinho();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showParcelamento, setShowParcelamento] = useState(false);

  // Recupera a última seleção do localStorage
  const ultimaSelecao = JSON.parse(localStorage.getItem(`produto_${produto.id}_selecao`)) || {};

  const {
    tamanhoSelecionado,
    quantidade,
    erro,
    tamanhosDisponiveis,
    selecionarTamanho,
    incrementarQuantidade,
    decrementarQuantidade,
    atualizarQuantidade,
    podeAdicionarSacola,
    adicionarSacola
  } = useProdutoSelecao({
    tamanhosDisponiveis: [37, 38, 39, 40, 41, 42, 43, 44],
    quantidadeMinima: 1,
    quantidadeMaxima: 10,
    tamanhoInicial: ultimaSelecao.tamanho,
    quantidadeInicial: ultimaSelecao.quantidade,
    onAdicionarSacola: (produtoComSelecao) => {
      // Salva a seleção no localStorage
      localStorage.setItem(
        `produto_${produto.id}_selecao`,
        JSON.stringify({
          tamanho: produtoComSelecao.tamanho,
          quantidade: produtoComSelecao.quantidade
        })
      );

      // Adiciona ao carrinho
      adicionarItem(produtoComSelecao);

      // Mostra o toast de sucesso
      setToast({
        message: `${produtoComSelecao.nome} adicionado à sacola!\nTamanho: ${produtoComSelecao.tamanho}\nQuantidade: ${produtoComSelecao.quantidade}`,
        type: 'success'
      });
    }
  });

  const handleAdicionarSacola = () => {
    const sucesso = adicionarSacola(produto);
    
    if (!sucesso) {
      setToast({
        message: erro || 'Não foi possível adicionar o produto à sacola',
        type: 'error'
      });
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };

  return (
    <div className={styles.produtoInfo}>
      <div className={styles.produtoDetails}>
        <h1 className={styles.produtoTitle}>{produto.nome}</h1>
        
        <div className={styles.produtoPrice}>
          <span className={styles.currentPrice}>
            {produto.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </span>
          {produto.precoOriginal && (
            <>
              <span className={styles.originalPrice}>
                {produto.precoOriginal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
              <span className={styles.discount}>
                {Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
              </span>
            </>
          )}
        </div>

        <button 
          className={styles.parcelamentoLink}
          onClick={() => setShowParcelamento(true)}
        >
          Ver opções de parcelamento
        </button>

        <ProdutoTamanho 
          tamanhos={tamanhosDisponiveis}
          tamanhoSelecionado={tamanhoSelecionado}
          onSelecionarTamanho={selecionarTamanho}
        />
        
        <ProdutoQuantidade 
          quantidade={quantidade}
          quantidadeMinima={1}
          quantidadeMaxima={10}
          onIncrementar={incrementarQuantidade}
          onDecrementar={decrementarQuantidade}
          onAtualizar={atualizarQuantidade}
        />
        
        <ProdutoAdicionarSacola 
          podeAdicionar={podeAdicionarSacola()}
          erro={erro}
          onAdicionarSacola={handleAdicionarSacola}
        />
      </div>

      <section className={styles.produtoSections}>
        <div className={styles.sectionDescricao}>
          <h2>Descrição do Produto</h2>
          <p>{produto.descricao}</p>
        </div>

        <div className={styles.sectionDescricao}>
          <h2>Qualidade do Produto</h2>
          <p>{produto.qualidade}</p>
        </div>

        <div className={styles.sectionDescricao}>
          <h2>Troca e Devolução</h2>
          <p>{produto.trocaDevolucao}</p>
        </div>
      </section>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ParcelamentoModal 
        isOpen={showParcelamento}
        onClose={() => setShowParcelamento(false)}
        preco={produto.preco}
      />
    </div>
  );
};

export default ProdutoInfo; 