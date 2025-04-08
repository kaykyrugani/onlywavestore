import React, { createContext, useContext, useState, useEffect } from 'react';
import { tenis, camisetas, acessorios } from '../pages/home/produtoscards';

const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega produtos do arquivo produtoscards.js
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Combina todos os produtos em uma única lista
        const todosProdutos = [
          ...tenis.map(p => ({ ...p, categoria: 'tenis' })),
          ...camisetas.map(p => ({ ...p, categoria: 'camisetas' })),
          ...acessorios.map(p => ({ ...p, categoria: 'acessorios' }))
        ];
        
        setProdutos(todosProdutos);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produtos');
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  // Busca produto por ID
  const buscarProdutoPorId = (id) => {
    return produtos.find(produto => produto.id === Number(id));
  };

  // Busca produtos por categoria
  const buscarProdutosPorCategoria = (categoria) => {
    return produtos.filter(produto => produto.categoria === categoria);
  };

  // Busca produtos relacionados (mesma categoria, excluindo o produto atual)
  const buscarProdutosRelacionados = (produtoId, limite = 4) => {
    const produtoAtual = buscarProdutoPorId(produtoId);
    if (!produtoAtual) return [];

    return produtos
      .filter(p => p.categoria === produtoAtual.categoria && p.id !== produtoAtual.id)
      .slice(0, limite);
  };

  return (
    <ProdutosContext.Provider value={{
      produtos,
      loading,
      error,
      buscarProdutoPorId,
      buscarProdutosPorCategoria,
      buscarProdutosRelacionados
    }}>
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error('useProdutos deve ser usado dentro de um ProdutosProvider');
  }
  return context;
}; 