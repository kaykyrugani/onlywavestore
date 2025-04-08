import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  columns = 4,
  gap = '1rem',
  loading = false,
  error = null,
  onAddToCart,
  onToggleFavorite,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`product-grid product-grid--loading ${className}`}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <div key={index} className="product-grid__skeleton">
            <div className="product-grid__skeleton-image" />
            <div className="product-grid__skeleton-content">
              <div className="product-grid__skeleton-title" />
              <div className="product-grid__skeleton-price" />
              <div className="product-grid__skeleton-button" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`product-grid product-grid--error ${className}`}>
        <div className="product-grid__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className={`product-grid product-grid--empty ${className}`}>
        <div className="product-grid__empty">
          <p>Nenhum produto encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`product-grid ${className}`}
      style={{
        '--grid-columns': columns,
        '--grid-gap': gap,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      image: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      discount: PropTypes.number,
      isNew: PropTypes.bool,
      isFavorite: PropTypes.bool,
    })
  ),
  columns: PropTypes.number,
  gap: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddToCart: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  className: PropTypes.string,
};

export default ProductGrid; 