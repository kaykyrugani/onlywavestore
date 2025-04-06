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
  
  // Estado para controlar animações
  const [itemAnimando, setItemAnimando] = useState(null);

  // Salva o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Adiciona um item ao carrinho com comportamento inteligente
  const adicionarItem = (produto) => {
    setCarrinho((prevCarrinho) => {
      // Verifica se o produto já existe no carrinho com o mesmo tamanho
      const itemExistente = prevCarrinho.find(
        (item) => item.id === produto.id && item.tamanho === produto.tamanho
      );

      let novoCarrinho;

      if (itemExistente) {
        // Se existir, atualiza a quantidade e aplica animação
        novoCarrinho = prevCarrinho.map((item) =>
          item.id === produto.id && item.tamanho === produto.tamanho
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        );
        
        // Define o item para animar
        setItemAnimando({
          id: produto.id,
          tamanho: produto.tamanho,
          tipo: 'atualizado'
        });
        
        // Remove a animação após 1 segundo
        setTimeout(() => setItemAnimando(null), 1000);
      } else {
        // Se não existir, adiciona como novo item
        novoCarrinho = [...prevCarrinho, produto];
        
        // Define o item para animar
        setItemAnimando({
          id: produto.id,
          tamanho: produto.tamanho,
          tipo: 'adicionado'
        });
        
        // Remove a animação após 1 segundo
        setTimeout(() => setItemAnimando(null), 1000);
      }
      
      return novoCarrinho;
    });
  };

  // Remove um item do carrinho
  const removerItem = (produtoId, tamanho) => {
    // Define o item para animar antes de remover
    setItemAnimando({
      id: produtoId,
      tamanho: tamanho,
      tipo: 'removido'
    });
    
    // Pequeno delay para permitir a animação antes de remover
    setTimeout(() => {
      setCarrinho((prevCarrinho) =>
        prevCarrinho.filter(
          (item) => !(item.id === produtoId && item.tamanho === tamanho)
        )
      );
      setItemAnimando(null);
    }, 300);
  };

  // Atualiza a quantidade de um item
  const atualizarQuantidade = (produtoId, tamanho, novaQuantidade) => {
    // Se a quantidade for 0, remover o item
    if (novaQuantidade <= 0) {
      removerItem(produtoId, tamanho);
      return;
    }
    
    // Define o item para animar
    setItemAnimando({
      id: produtoId,
      tamanho: tamanho,
      tipo: 'atualizado'
    });
    
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item) =>
        item.id === produtoId && item.tamanho === tamanho
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
    
    // Remove a animação após 1 segundo
    setTimeout(() => setItemAnimando(null), 1000);
  };

  // Limpa o carrinho
  const limparCarrinho = () => {
    // Define uma animação para o carrinho sendo limpo
    setItemAnimando({
      tipo: 'limpo'
    });
    
    // Limpa o carrinho após uma pequena animação
    setTimeout(() => {
      setCarrinho([]);
      setItemAnimando(null);
    }, 300);
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
        valorTotal,
        itemAnimando
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoContext; 