import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useCart } from '../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
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
            className={styles.starFilled} 
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon 
            key={i} 
            icon={farStar} 
            className={styles.starEmpty} 
          />
        );
      }
    }
    
    return stars;
  };

  // Calcular preço com desconto se o produto estiver em promoção
  const discountedPrice = product.promocao ? product.preco * 0.9 : null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nome,
      price: product.promocao ? discountedPrice : product.preco,
      image: product.imagem || "/assets/placeholder.png",
      quantity: 1
    });
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <OptimizedImage 
          src={product.imagem || "/assets/placeholder.png"} 
          alt={product.nome}
          width="200"
          height="200"
        />
        <FavoriteButton product={product} />
        {product.promocao && (
          <div className={styles.discountTag}>
            -{calculateDiscount(product.preco, discountedPrice)}%
          </div>
        )}
      </div>
      
      <div className={styles.productRating}>
        {renderStars(product.avaliacoes)}
      </div>
      
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{product.nome}</div>
        
        <div className={styles.productPriceContainer}>
          {product.promocao ? (
            <>
              <span className={styles.originalPrice}>{formatPrice(product.preco)}</span>
              <span className={styles.discountedPrice}>{formatPrice(discountedPrice)}</span>
            </>
          ) : (
            <div className={styles.productPrice}>{formatPrice(product.preco)}</div>
          )}
        </div>
        
        <div 
          className={styles.productInstallment} 
          dangerouslySetInnerHTML={{ __html: product.divisao }}
        ></div>
        
        <button 
          className={styles.productButton}
          onClick={handleAddToCart}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
