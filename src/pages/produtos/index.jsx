import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO/SEO';
import Container from '../../components/Container/Container';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import SortDropdown from './SortDropdown';
import { tenis, camisetas, acessorios } from '../home/produtoscards';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from './styleproduto.module.css';

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
    if (categoria && categoryMap[categoria]) {
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
    }
  }, [categoria, produtoId, productsPerPage]);

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

  // Obter o nome de exibição da categoria para SEO
  const categoryDisplayName = categoryMap[categoria]?.displayName || 'Produtos';
  
  // Verificar se a categoria existe
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
              
              <div className={styles.sortContainer}>
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
        </Container>
      </motion.div>
    </Layout>
  );
};

export default ProductsPage;
