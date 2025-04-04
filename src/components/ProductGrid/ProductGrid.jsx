import React, { memo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.productGridContainer}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
};

// Usar memo para evitar re-renderizações desnecessárias
export default memo(ProductGrid);
