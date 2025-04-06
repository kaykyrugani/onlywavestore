import React, { useState } from 'react';
import styles from './ProdutoThumbnails.module.css';

const ProdutoThumbnails = ({ images, onSelectImage }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (onSelectImage) {
      onSelectImage(index);
    }
  };

  return (
    <div className={styles.produtoThumbnails}>
      <div className={styles.thumbnailsContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniatura ${index + 1}`}
            className={`${styles.thumbnail} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProdutoThumbnails; 