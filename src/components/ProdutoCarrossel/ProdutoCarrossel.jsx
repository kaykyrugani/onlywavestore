import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './ProdutoCarrossel.module.css';
import ProdutoZoom from '../ProdutoZoom/ProdutoZoom';

const ProdutoCarrossel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  // Pré-carrega as imagens
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => resolve(null);
        });
      });

      const loaded = await Promise.all(loadPromises);
      setLoadedImages(loaded.filter(Boolean));
    };

    preloadImages();
  }, [images]);

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setIsZoomed(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrevClick = () => {
    if (isAnimating || isZoomed || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNextClick = () => {
    if (isAnimating || isZoomed || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleZoomChange = (zoomed) => {
    setIsZoomed(zoomed);
  };

  if (loadedImages.length === 0) {
    return (
      <div className={styles.produtoCarrossel}>
        <div className={styles.mainImageContainer}>
          <div className={styles.placeholder}>
            <div className={styles.spinner}></div>
            <p>Carregando imagens...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.produtoCarrossel}>
      {loadedImages.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          {loadedImages.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnailButton} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Ver imagem ${index + 1} do produto`}
              disabled={isZoomed}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className={styles.thumbnail}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <div className={styles.mainImageContainer}>
        {loadedImages.length > 1 && (
          <button 
            className={`${styles.navigationButton} ${styles.prevButton}`}
            onClick={handlePrevClick}
            disabled={isZoomed}
            aria-label="Imagem anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <ProdutoZoom 
          imageUrl={loadedImages[currentIndex]}
          alt={`Imagem ${currentIndex + 1} do produto`}
          onZoomChange={handleZoomChange}
          isAnimating={isAnimating}
        />

        {loadedImages.length > 1 && (
          <button 
            className={`${styles.navigationButton} ${styles.nextButton}`}
            onClick={handleNextClick}
            disabled={isZoomed}
            aria-label="Próxima imagem"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProdutoCarrossel; 