import React, { createContext, useContext, useState, useEffect } from 'react';

// Dados mockados de produtos
const produtosMock = [
  {
    id: 1,
    nome: 'Tênis Wave Runner',
    preco: 89.90,
    precoOriginal: 129.90,
    descricao: 'Tênis leve e confortável, perfeito para corridas e caminhadas. Design exclusivo OnlyWave com tecnologia de amortecimento.',
    qualidade: 'Produto com tecnologia de amortecimento avançada, garantindo máximo conforto e durabilidade. Produzido com materiais sustentáveis.',
    politicaDevolucao: 'Devolução gratuita em até 30 dias após a compra, desde que o produto esteja em perfeitas condições e com a etiqueta.',
    tamanhos: ['38', '39', '40', '41', '42'],
    imagens: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    categoria: 'tenis'
  },
  {
    id: 2,
    nome: 'Bermuda Beach Life',
    preco: 129.90,
    precoOriginal: 159.90,
    descricao: 'Bermuda confeccionada em tecido leve e resistente, ideal para dias na praia ou na piscina. Design moderno com bolsos funcionais.',
    qualidade: 'Tecido 100% poliéster com tratamento anti-UV. Costuras reforçadas para maior durabilidade.',
    politicaDevolucao: 'Devolução gratuita em até 30 dias após a compra, desde que o produto esteja em perfeitas condições e com a etiqueta.',
    tamanhos: ['38', '40', '42', '44'],
    imagens: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    categoria: 'bermudas'
  },
  {
    id: 3,
    nome: 'Regata Surf Style',
    preco: 69.90,
    precoOriginal: 89.90,
    descricao: 'Regata com design inspirado no surf, confeccionada em tecido leve e respirável. Perfeita para atividades ao ar livre.',
    qualidade: 'Tecido 100% poliéster com tratamento anti-UV e secagem rápida. Ideal para atividades aquáticas.',
    politicaDevolucao: 'Devolução gratuita em até 30 dias após a compra, desde que o produto esteja em perfeitas condições e com a etiqueta.',
    tamanhos: ['P', 'M', 'G', 'GG'],
    imagens: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    categoria: 'regatas'
  },
  {
    id: 4,
    nome: 'Boné Wave Classic',
    preco: 59.90,
    precoOriginal: 79.90,
    descricao: 'Boné clássico com design moderno, confeccionado em tecido resistente e com fechamento ajustável.',
    qualidade: 'Tecido 100% algodão com tratamento anti-UV. Visor rígido e fechamento com velcro para ajuste perfeito.',
    politicaDevolucao: 'Devolução gratuita em até 30 dias após a compra, desde que o produto esteja em perfeitas condições e com a etiqueta.',
    tamanhos: ['Único'],
    imagens: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    categoria: 'acessorios'
  }
];

const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simula carregamento de produtos da API
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProdutos(produtosMock);
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