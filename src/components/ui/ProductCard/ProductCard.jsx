import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../Image/Image';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  images,
  discount,
  isNew,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
  className = '',
}) => {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart?.({ id, name, price, image: images?.[0] || image });
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    onToggleFavorite?.({ id, name, price, image: images?.[0] || image });
  };

  return (
    <div className={`product-card ${className}`}>
      <Link to={`/produto/${id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <Image
            src={images?.[0] || image}
            alt={name}
            className="product-card__image"
            width="100%"
            height="100%"
          />
          
          {discountPercentage > 0 && (
            <span className="product-card__discount">
              -{discountPercentage}%
            </span>
          )}
          
          {isNew && (
            <span className="product-card__badge product-card__badge--new">
              Novo
            </span>
          )}
          
          <button
            className={`product-card__favorite ${isFavorite ? 'product-card__favorite--active' : ''}`}
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="product-card__favorite-icon"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
        
        <div className="product-card__content">
          <h3 className="product-card__name">{name}</h3>
          
          <div className="product-card__pricing">
            <span className="product-card__price">
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            
            {originalPrice && (
              <span className="product-card__original-price">
                {originalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            )}
          </div>
          
          <Button
            variant="primary"
            size="small"
            fullWidth
            onClick={handleAddToCart}
            className="product-card__button"
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  image: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  discount: PropTypes.number,
  isNew: PropTypes.bool,
  isFavorite: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  className: PropTypes.string,
};

export default ProductCard; 