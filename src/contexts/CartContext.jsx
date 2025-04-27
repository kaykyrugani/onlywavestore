import React, { createContext, useContext, useState, useEffect } from "react";
import { useCarrinho } from "./CarrinhoContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(window.location.pathname);
  
  // Usar o contexto do carrinho principal
  const { carrinho, adicionarItem, removerItem, atualizarQuantidade, limparCarrinho } = useCarrinho();
  
  // Sincronizar os itens do carrinho
  useEffect(() => {
    // Converter do formato do CarrinhoContext para o formato do CartContext
    const convertedItems = carrinho.map(item => ({
      id: item.id,
      name: item.nome,
      price: item.preco,
      quantity: item.quantidade,
      image: Array.isArray(item.imagens) ? item.imagens[0] : item.imagens,
      size: item.tamanho,
      tamanho: item.tamanho // Para compatibilidade
    }));
    
    setCartItems(convertedItems);
  }, [carrinho]);

  // Efeito para fechar o carrinho quando a rota muda usando a API History
  useEffect(() => {
    const handleLocationChange = () => {
      const currentPathname = window.location.pathname;
      // Se o caminho mudou, fechar o carrinho
      if (currentPathname !== lastPathname) {
        setIsCartOpen(false);
        setLastPathname(currentPathname);
      }
    };

    // Ouvir eventos de mudança de histórico
    window.addEventListener('popstate', handleLocationChange);

    // Também verificar quando o componente é montado
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [lastPathname]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Função para adicionar item (usa o adicionarItem do CarrinhoContext)
  const addToCart = (item) => {
    const carrinhoItem = {
      id: item.id,
      nome: item.name || item.nome,
      preco: item.price || item.preco,
      quantidade: 1,
      imagens: item.image || item.imagens,
      tamanho: item.size || item.tamanho || 'Único'
    };
    
    adicionarItem(carrinhoItem);
  };

  // Função para atualizar quantidade (usa o atualizarQuantidade do CarrinhoContext)
  const updateCartItem = (id, newQuantity) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      // Validar e limitar a quantidade
      const validQuantity = Math.max(1, newQuantity); // Nunca permitir menos que 1
      
      // Atualizar a quantidade
      atualizarQuantidade(id, item.size || item.tamanho, validQuantity);
    }
  };

  // Função para remover item (usa o removerItem do CarrinhoContext)
  const removeFromCart = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      removerItem(id, item.size || item.tamanho);
    }
  };

  // Função para limpar carrinho (usa o limparCarrinho do CarrinhoContext)
  const clearCart = () => limparCarrinho();
  
  // Calcular o total de itens
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Função para somar o valor total do carrinho
  const getTotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
