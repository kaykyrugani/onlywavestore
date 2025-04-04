import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO/SEO';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './Favoritos.module.css';

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

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  
  return (
    <Layout
      seo={
        <SEO
          title="Meus Favoritos | OnlyWave Store"
          description="Veja todos os seus produtos favoritos da OnlyWave Store."
        />
      }
    >
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className={styles.favoritesPage}
      >
        <div className={styles.favoritesContainer}>
          <div className={styles.favoritesHeader}>
            <h1>Meus Favoritos</h1>
            <p>Você tem {favorites.length} {favorites.length === 1 ? 'item' : 'itens'} nos favoritos</p>
          </div>
          
          {favorites.length === 0 ? (
            <div className={styles.emptyFavorites}>
              <h2>Você ainda não tem favoritos</h2>
              <p>Adicione produtos aos favoritos para vê-los aqui.</p>
            </div>
          ) : (
            <ProductGrid 
              products={favorites} 
              currentPage={1} 
              totalPages={1} 
              onPageChange={() => {}} 
            />
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default FavoritesPage;
