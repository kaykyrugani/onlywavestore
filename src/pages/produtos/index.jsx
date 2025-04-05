import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO/SEO';
import Container from '../../components/Container/Container';
import ProductGrid from '../../components/ProductGrid/index';
import { tenis, camisetas, acessorios } from '../home/produtoscards';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from './Produto.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeSort, setActiveSort] = useState('relevancia');
    const productsPerPage = 8;

    useEffect(() => {
      if (categoria && categoryMap[categoria]) {
        setProducts(categoryMap[categoria].data);
        setCurrentPage(1);
      
        if (produtoId) {
          const productIndex = categoryMap[categoria].data.findIndex(
            p => p.id.toString() === produtoId
          );
        
          if (productIndex !== -1) {
            const pageNumber = Math.floor(productIndex / productsPerPage) + 1;
            setCurrentPage(pageNumber);
          }
        }
      }
    }, [categoria, produtoId, productsPerPage]);

    const sortOptions = [
      { value: 'relevancia', label: 'Relevância' },
      { value: 'menor-preco', label: 'Menor Preço' },
      { value: 'maior-preco', label: 'Maior Preço' },
      { value: 'mais-vendidos', label: 'Mais Vendidos' },
      { value: 'lancamentos', label: 'Lançamentos' }
    ];

    const handleSortChange = (sortValue) => {
      setActiveSort(sortValue);
      // Implemente a lógica de ordenação aqui
    };

    const sortedProducts = useMemo(() => {
      if (!products.length) return [];
    
      const productsCopy = [...products];
    
      switch (sortOption) {
        case 'menor-preco':
          return productsCopy.sort((a, b) => a.preco - b.preco);
        case 'maior-preco':
          return productsCopy.sort((a, b) => b.preco - a.preco);
        case 'mais-vendidos':
          return productsCopy.sort((a, b) => b.avaliacoes - a.avaliacoes);
        case 'lancamentos':
          return productsCopy.sort((a, b) => b.id - a.id);
        default:
          return productsCopy;
      }
    }, [products, sortOption]);

    const currentProducts = useMemo(() => {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    }, [sortedProducts, currentPage, productsPerPage]);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const categoryDisplayName = categoryMap[categoria]?.displayName || 'Produtos';
  
    if (categoria && !categoryMap[categoria]) {
      return (
        <Layout
          seo={
            <SEO 
              title="Categoria não encontrada"
              description="A categoria que você está procurando não existe."
              canonicalUrl={`https://onlywavestore.com/produtos/${categoria}`}
            />
          }
        >
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className={styles.pageContent}
          >
            <Container>
              <div className={styles.categoryNotFound}>
                <h2>Categoria não encontrada</h2>
                <p>A categoria que você está procurando não existe.</p>
              </div>
            </Container>
          </motion.div>
        </Layout>
      );
    }

    return (
      <Layout
        seo={
          <SEO 
            title={categoryDisplayName}
            description={`Confira nossa coleção de ${categoryDisplayName.toLowerCase()} com os melhores preços e frete grátis para todo o Brasil.`}
            keywords={`${categoryDisplayName.toLowerCase()}, moda, OnlyWave, comprar ${categoryDisplayName.toLowerCase()}`}
            canonicalUrl={`https://onlywavestore.com/produtos/${categoria}`}
          />
        }
      >
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className={styles.pageContent}
        >
          <Container>
            <div className={styles.productsContainer}>
              <div className={styles.productsHeader}>
                <h1>{categoryDisplayName}</h1>
                <div style={{ position: 'relative' }}>
                  <button 
                    className={styles.filterButton}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <FontAwesomeIcon 
                      icon={faFilter} 
                      className={isFilterOpen ? styles.active : ''}
                    />
                    Filtrar
                  </button>
                
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div 
                        className={styles.filterPanel}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3>Filtros</h3>
                        <div className={styles.filterGroup}>
                          <h4>Ordenar por</h4>
                          <div className={styles.sortOptions}>
                            {sortOptions.map((option, index) => (
                             <motion.div 
                             key={option.value}
                             className={`${styles.sortOption} ${activeSort === option.value ? styles.active : ''}`}
                             onClick={() => handleSortChange(option.value)}
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                             whileHover={{ transition: { duration: 0.7 } }}
                           >
                             {option.label}
                           </motion.div>
                            ))}
                          </div>
                        </div>
                      
                        <div className={styles.filterActions}>
                          <button 
                            className={styles.clearFilters}
                            onClick={() => {
                              setActiveSort('relevancia');
                              // Limpar outros filtros
                            }}
                          >
                            Limpar Filtros
                          </button>
                          <button 
                            className={styles.applyFilters}
                            onClick={() => {
                              // Aplicar filtros
                              setIsFilterOpen(false);
                            }}
                          >
                            Aplicar Filtros
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            
              <ProductGrid 
                products={currentProducts} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={paginate} 
              />
            </div>
          </Container>
        </motion.div>
      </Layout>
    );
  };
export default ProductsPage;
