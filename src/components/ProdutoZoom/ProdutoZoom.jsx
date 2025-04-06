import React, { useState, useEffect } from 'react';
import styles from './ProdutoZoom.module.css';
import useZoom from '../../hooks/useZoom';

const ProdutoZoom = ({ imageUrl, alt, onZoomChange, isAnimating }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  
  const {
    isZoomed,
    zoomPosition,
    containerRef,
    imageRef,
    handleZoomActivate,
    handleZoomDeactivate,
    handleMouseMove,
    zoomLevel,
    animationDuration
  } = useZoom({
    zoomLevel: 2.5,
    animationDuration: 300,
    onZoomChange
  });

  // Implementação de lazy loading
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
      setImageSrc(imageUrl);
    };
    
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);

  // Desativa o zoom quando a imagem está animando
  useEffect(() => {
    if (isAnimating && isZoomed) {
      handleZoomDeactivate();
    }
  }, [isAnimating, isZoomed, handleZoomDeactivate]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.zoomContainer} ${isZoomed ? styles.zoomed : ''} ${isAnimating ? styles.animating : ''}`}
      onClick={isZoomed ? handleZoomDeactivate : handleZoomActivate}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleZoomDeactivate}
    >
      <div 
        ref={imageRef}
        className={styles.zoomImage}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
          transition: `transform ${animationDuration}ms ease`
        }}
      >
        {!imageLoaded && (
          <div className={styles.placeholder}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <img 
          src={imageSrc}
          alt={alt}
          draggable="false"
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: `opacity ${animationDuration}ms ease`
          }}
        />
      </div>
    </div>
  );
};

export default ProdutoZoom; 