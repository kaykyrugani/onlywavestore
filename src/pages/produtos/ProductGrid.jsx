import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTag, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const ProductGrid = ({ products, currentPage, totalPages, onPageChange }) => {
  // Função para formatar preço com separador de milhares
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
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
          <FontAwesomeIcon 
            key={i} 
            icon={fasStar} 
            className="star-filled" 
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon 
            key={i} 
            icon={farStar} 
            className="star-empty" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => {
          // Assumir preço com desconto de 10% para produtos em promoção
          const discountedPrice = product.promocao 
            ? product.preco * 0.9 
            : null;
          
          return (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.imagem || "https://via.placeholder.com/200x200"} alt={product.nome} />
                {product.promocao && (
                  <div className="discount-tag">
                    -{calculateDiscount(product.preco, discountedPrice)}%
                  </div>
                )}
              </div>
              
              <div className="product-rating">
                {renderStars(product.avaliacoes)}
              </div>
              
              <div className="product-info">
                <div className="product-title">{product.nome}</div>
                
                <div className="product-price-container">
                  {product.promocao ? (
                    <>
                      <span className="original-price">{formatPrice(product.preco)}</span>
                      <span className="discounted-price">{formatPrice(discountedPrice)}</span>
                    </>
                  ) : (
                    <div className="product-price">{formatPrice(product.preco)}</div>
                  )}
                </div>
                
                <div className="product-installment" dangerouslySetInnerHTML={{ __html: product.divisao }}></div>
                
                <button className="product-button">Comprar</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button 
            className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
      
      {/* Indicadores visuais (bolinhas) */}
      {totalPages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`pagination-dot ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => onPageChange(index + 1)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
