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

  // Calcula o preço com desconto se houver promoção
  const precoComDesconto = produto.promocao ? produto.preco * 0.9 : produto.preco;

  // Extrai o número de parcelas e o valor da parcela da string de divisão
  const [numParcelas, valorParcela] = produto.divisao
    .match(/(\d+)x de <span>(\d+,\d+)<\/span>/)
    .slice(1);

  return (
    <div className={styles.produtoInfo}>
      <div className={styles.produtoDetails}>
        <h1 className={styles.produtoTitle}>{produto.nome}</h1>
        
        <div className={styles.produtoPrice}>
          <span className={styles.currentPrice}>
            {precoComDesconto.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </span>
          {produto.promocao && (
            <>
              <span className={styles.originalPrice}>
                {produto.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
              <span className={styles.discount}>
                {Math.round(((produto.preco - precoComDesconto) / produto.preco) * 100)}%
              </span>
            </>
          )}
        </div>

        <div className={styles.parcelamento}>
          <span className={styles.parcelamentoText}>
            {numParcelas}x de <span className={styles.parcelamentoValor}>R$ {valorParcela}</span> sem juros
          </span>
          <button 
            className={styles.parcelamentoLink}
            onClick={() => setShowParcelamento(true)}
          >
            Ver parcelamento
          </button>
        </div>

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
          <p>{produto.nome} - Produto de alta qualidade da OnlyWave Store.</p>
        </div>

        <div className={styles.sectionDescricao}>
          <h2>Qualidade do Produto</h2>
          <p>Produto com garantia de qualidade e durabilidade.</p>
        </div>

        <div className={styles.sectionDescricao}>
          <h2>Troca e Devolução</h2>
          <p>Devolução gratuita em até 30 dias após a compra, desde que o produto esteja em perfeitas condições e com a etiqueta.</p>
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
        preco={precoComDesconto}
      />
    </div>
  );
};

export default ProdutoInfo; 