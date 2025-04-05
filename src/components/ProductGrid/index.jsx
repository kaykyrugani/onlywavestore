import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTag, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import styles from './Produtogrid.module.css';

const ProductGrid = ({ products, currentPage, totalPages, onPageChange }) => {
  // Função para formatar preço com separador de milhares
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Função para calcular porcentagem de desconto
  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  // Função para renderizar avaliações em estrelas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={fasStar} className={styles.starFilled} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} className={styles.starEmpty} />
        );
      }
    }

    return stars;
  };

  return (
    <div className={styles.productGridContainer}>
      <div className={styles.productGrid}>
        {products.map((product) => {
          // Assumir preço com desconto de 10% para produtos em promoção
          const discountedPrice = product.promocao ? product.preco * 0.9 : null;

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.imagem || 'https://via.placeholder.com/200x200'}
                  alt={product.nome}
                />
                {product.promocao && (
                  <div className={styles.discountTag}>
                    -{calculateDiscount(product.preco, discountedPrice)}%
                  </div>
                )}
              </div>

              <div className={styles.productRating}>{renderStars(product.avaliacoes)}</div>

              <div className={styles.productInfo}>
                <div className={styles.productTitle}>{product.nome}</div>

                <div className={styles.productPriceContainer}>
                  {product.promocao ? (
                    <>
                      <span className={styles.originalPrice}>
                        {formatPrice(product.preco)}
                      </span>
                      <span className={styles.discountedPrice}>
                        {formatPrice(discountedPrice)}
                      </span>
                    </>
                  ) : (
                    <div className={styles.productPrice}>
                      {formatPrice(product.preco)}
                    </div>
                  )}
                </div>

                <div
                  className={styles.productInstallment}
                  dangerouslySetInnerHTML={{ __html: product.divisao }}
                ></div>

                <button className={styles.productButton}>Comprar</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            className={`${styles.paginationArrow} ${
              currentPage === 1 ? styles.disabled : ''
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className={styles.paginationNumbers}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`${styles.paginationNumber} ${
                  currentPage === index + 1 ? styles.active : ''
                }`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className={`${styles.paginationArrow} ${
              currentPage === totalPages ? styles.disabled : ''
            }`}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {/* Indicadores visuais (bolinhas) */}
      {totalPages > 1 && (
        <div className={styles.paginationDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.paginationDot} ${
                currentPage === index + 1 ? styles.active : ''
              }`}
              onClick={() => onPageChange(index + 1)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

// Usar memo para evitar re-renderizações desnecessárias
export default memo(ProductGrid);