import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import styles from './ProdutoInfo.module.css';
import ProdutoTamanho from '../ProdutoTamanho/ProdutoTamanho';
import ProdutoQuantidade from '../ProdutoQuantidade/ProdutoQuantidade';
import ProdutoAdicionarSacola from '../ProdutoAdicionarSacola/ProdutoAdicionarSacola';
import StarRating from '../StarRating/StarRating';
import Toast from '../Toast/Toast';
import useProdutoSelecao from '../../hooks/useProdutoSelecao';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import ParcelamentoModal from '../ParcelamentoModal/ParcelamentoModal';

const ProdutoInfo = ({ produto, onAddToCart }) => {
  const [toast, setToast] = useState(null);
  const { adicionarItem } = useCarrinho();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showParcelamento, setShowParcelamento] = useState(false);

  // Recupera a última seleção do localStorage
  const ultimaSelecao = JSON.parse(localStorage.getItem(`produto_${produto.id}_selecao`)) || {};

  const {
    tamanhoSelecionado,
    quantidade: produtoQuantidade,
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

  const handleQuantidadeChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= produto.estoque) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (quantity > produto.estoque) {
      toast.error('Quantidade indisponível em estoque');
      return;
    }
    onAddToCart({ ...produto, quantidade });
    toast.success('Produto adicionado ao carrinho!');
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  // Calcula o preço com desconto se houver promoção
  const precoComDesconto = produto.promocao ? produto.preco * 0.9 : produto.preco;

  // Sempre exibir 12x de ... sem juros, calculando valor da parcela
  const parcelas = 12;
  const valorParcela12x = (precoComDesconto / parcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <motion.div
      className={styles.produtoInfo}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nome do produto */}
      <h1 className={styles.produtoTitle}>{produto.nome}</h1>

      {/* Preço e desconto */}
      <div className={styles.produtoPrice}>
        <span className={styles.currentPrice}>{formatarPreco(precoComDesconto)}</span>
        {produto.promocao && (
          <>
            <span className={styles.originalPrice}>{formatarPreco(produto.preco)}</span>
            <span className={styles.discount}>{Math.round(((produto.preco - precoComDesconto) / produto.preco) * 100)}%</span>
          </>
        )}
      </div>

      {/* Parcelamento */}
      <div className={styles.parcelamento}>
        <span className={styles.parcelamentoText}>
          {parcelas}x de <span className={styles.parcelamentoValor}>R$ {valorParcela12x}</span> sem juros
        </span>
        <button
          className={styles.parcelamentoLink}
          type="button"
          onClick={() => setShowParcelamento(true)}
        >
          Ver parcelamento
        </button>
      </div>

      {/* Tamanhos */}
      <div className={styles.sizeSelector}>
        <h3>Tamanho</h3>
        <div className={styles.sizeOptions}>
          {[37,38,39,40,41,42,43,44].map((tamanho) => (
            <button
              key={tamanho}
              className={
                tamanhoSelecionado === tamanho
                  ? `${styles.sizeButton} ${styles.selected}`
                  : styles.sizeButton
              }
              onClick={() => selecionarTamanho(tamanho)}
              aria-label={`Selecionar tamanho ${tamanho}`}
            >
              {tamanho}
            </button>
          ))}
        </div>
      </div>

      {/* Quantidade e botão de adicionar à sacola lado a lado */}
      <div className={styles.quantityAndCartContainer}>
        <div className={styles.quantitySelector}>
          <button onClick={decrementarQuantidade} aria-label="Diminuir quantidade">-</button>
          <span>{produtoQuantidade}</span>
          <button onClick={incrementarQuantidade} aria-label="Aumentar quantidade">+</button>
        </div>
        <button
          className={styles.addToCart}
          onClick={handleAdicionarSacola}
          disabled={!podeAdicionarSacola}
        >
          Adicionar à sacola
        </button>
      </div>

      {/* Modal de parcelamento */}
      <ParcelamentoModal
        isOpen={showParcelamento}
        onClose={() => setShowParcelamento(false)}
        preco={precoComDesconto}
      />
      {/* Toast de feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </motion.div>
  );
};

export default ProdutoInfo;