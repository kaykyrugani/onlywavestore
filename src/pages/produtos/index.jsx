import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../home/header';
import Footer from '../home/footer';
import ProductGrid from './ProductGrid';
import SortDropdown from './SortDropdown';
import { tenis, camisetas, acessorios } from '../home/produtoscards';
import './styleproduto.css';

// Mapeamento de categorias para dados e nomes de exibição
const categoryMap = {
  tenis: { data: tenis, displayName: 'Sneakers' },
  camisetas: { data: camisetas, displayName: 'Camisetas' },
  acessorios: { data: acessorios, displayName: 'Acessórios' }
};

// Configuração da animação de página
const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const ProductsPage = () => {
  const { categoria } = useParams();
  const [searchParams] = useSearchParams();
  const produtoId = searchParams.get('produto');
  
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // 4 produtos por linha, 2 linhas por página

  // Verificar se a categoria existe e carregar os produtos correspondentes
  useEffect(() => {
    console.log('useEffect executando, categoria:', categoria);
    console.log('Categorias disponíveis:', Object.keys(categoryMap));
    
    if (categoria && categoryMap[categoria]) {
      console.log('Produtos encontrados:', categoryMap[categoria].data.length);
      setProducts(categoryMap[categoria].data);
      setCurrentPage(1); // Reset para a primeira página ao mudar de categoria
      
      // Se um produto específico foi solicitado, encontre sua página
      if (produtoId) {
        const productIndex = categoryMap[categoria].data.findIndex(
          p => p.id.toString() === produtoId
        );
        
        if (productIndex !== -1) {
          const pageNumber = Math.floor(productIndex / productsPerPage) + 1;
          setCurrentPage(pageNumber);
        }
      }
    } else {
      console.log('Categoria não encontrada ou inválida');
    }
  }, [categoria, produtoId]);

  // Opções de ordenação
  const sortOptions = [
    { value: 'default', label: 'Padrão' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' },
    { value: 'name-asc', label: 'Ordem alfabética (A-Z)' },
    { value: 'name-desc', label: 'Ordem alfabética (Z-A)' },
    { value: 'rating-desc', label: 'Melhor avaliado' },
    { value: 'newest', label: 'Lançamento' },
    { value: 'bestseller', label: 'Mais vendidos' }
  ];

  // Aplicar ordenação aos produtos
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    
    const productsCopy = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        return productsCopy.sort((a, b) => a.preco - b.preco);
      case 'price-desc':
        return productsCopy.sort((a, b) => b.preco - a.preco);
      case 'name-asc':
        return productsCopy.sort((a, b) => a.nome.localeCompare(b.nome));
      case 'name-desc':
        return productsCopy.sort((a, b) => b.nome.localeCompare(a.nome));
      case 'rating-desc':
        return productsCopy.sort((a, b) => b.avaliacoes - a.avaliacoes);
      case 'newest':
        // Assumindo que produtos mais recentes têm IDs maiores
        return productsCopy.sort((a, b) => b.id - a.id);
      case 'bestseller':
        // Aqui você precisaria de um campo adicional para "mais vendidos"
        // Por enquanto, vamos usar a avaliação como substituto
        return productsCopy.sort((a, b) => b.avaliacoes - a.avaliacoes);
      default:
        return productsCopy;
    }
  }, [products, sortOption]);

  // Calcular produtos da página atual
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  // Calcular número total de páginas
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Verificar se a categoria existe
  if (categoria && !categoryMap[categoria]) {
    return (
      <div className="products-page">
        <Header />
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="page-content"
        >
          <div className="category-not-found">
            <h2>Categoria não encontrada</h2>
            <p>A categoria que você está procurando não existe.</p>
          </div>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="products-page">
      <Header />
      
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="page-content"
      >
        <div className="products-container">
          <div className="products-header">
            <h1>{categoryMap[categoria]?.displayName || 'Produtos'}</h1>
            
            <div className="sort-container">
              <h4>Ordenar por:</h4>
              <SortDropdown 
                options={sortOptions} 
                selectedOption={sortOption} 
                onSelect={setSortOption} 
              />
            </div>
          </div>
          
          <ProductGrid 
            products={currentProducts} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={paginate} 
          />
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
