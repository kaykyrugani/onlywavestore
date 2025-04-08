import React, { useState, useEffect } from 'react';
import styles from './ProdutoZoom.module.css';
import useZoom from '../../hooks/useZoom';

const ProdutoZoom = ({ imageUrl, alt, onZoomChange, isAnimating }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [loadError, setLoadError] = useState(false);
  
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

  // Implementação de lazy loading com tratamento de erro
  useEffect(() => {
    setImageLoaded(false);
    setLoadError(false);
    
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
      setImageSrc(imageUrl);
      setLoadError(false);
    };
    
    img.onerror = () => {
      setImageLoaded(true);
      setLoadError(true);
      setImageSrc('https://via.placeholder.com/400x400?text=Erro+ao+carregar+imagem');
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  // Desativa o zoom quando a imagem está animando ou houve erro
  useEffect(() => {
    if ((isAnimating || loadError) && isZoomed) {
      handleZoomDeactivate();
    }
  }, [isAnimating, loadError, isZoomed, handleZoomDeactivate]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.zoomContainer} ${isZoomed ? styles.zoomed : ''} ${isAnimating ? styles.animating : ''}`}
      onClick={loadError ? null : (isZoomed ? handleZoomDeactivate : handleZoomActivate)}
      onMouseMove={loadError ? null : handleMouseMove}
      onMouseLeave={handleZoomDeactivate}
      style={{ cursor: loadError ? 'default' : (isZoomed ? 'zoom-out' : 'zoom-in') }}
    >
      <div 
        ref={imageRef}
        className={styles.zoomImage}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          transform: isZoomed && !loadError ? `scale(${zoomLevel})` : 'scale(1)',
          transition: `transform ${animationDuration}ms ease`
        }}
      >
        {!imageLoaded && (
          <div className={styles.placeholder}>
            <div className={styles.spinner}></div>
            <p>Carregando imagem...</p>
          </div>
        )}
        
        {loadError && imageLoaded && (
          <div className={styles.errorMessage}>
            <p>Erro ao carregar a imagem</p>
            <button onClick={() => window.location.reload()}>Tentar novamente</button>
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