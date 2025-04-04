import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './FavoriteButton.module.css';

// Versão simplificada sem o hook useFavorites
const FavoriteButton = ({ product }) => {
  // Estado local temporário para demonstração
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <FontAwesomeIcon 
        icon={isFavorite ? solidHeart : regularHeart} 
        className={styles.icon}
      />
    </button>
  );
};

export default FavoriteButton;
