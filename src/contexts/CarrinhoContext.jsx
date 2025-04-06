import React, { createContext, useState, useContext, useEffect } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

export const CarrinhoProvider = ({ children }) => {
  // Carrega o carrinho do localStorage ao inicializar
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // Salva o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Adiciona um item ao carrinho
  const adicionarItem = (produto) => {
    setCarrinho((prevCarrinho) => {
      // Verifica se o produto já existe no carrinho com o mesmo tamanho
      const itemExistente = prevCarrinho.find(
        (item) => item.id === produto.id && item.tamanho === produto.tamanho
      );

      if (itemExistente) {
        // Se existir, atualiza a quantidade
        return prevCarrinho.map((item) =>
          item.id === produto.id && item.tamanho === produto.tamanho
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        );
      } else {
        // Se não existir, adiciona como novo item
        return [...prevCarrinho, produto];
      }
    });
  };

  // Remove um item do carrinho
  const removerItem = (produtoId, tamanho) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter(
        (item) => !(item.id === produtoId && item.tamanho === tamanho)
      )
    );
  };

  // Atualiza a quantidade de um item
  const atualizarQuantidade = (produtoId, tamanho, novaQuantidade) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item) =>
        item.id === produtoId && item.tamanho === tamanho
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  // Limpa o carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Calcula o total de itens no carrinho
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // Calcula o valor total do carrinho
  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoContext; 