import React, { useState, useEffect } from 'react';
import styles from './OptimizedImage.module.css';

const OptimizedImage = ({ src, alt, width, height, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setImageSrc(src);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    // Use a placeholder image when the original image fails to load
    setImageSrc('https://via.placeholder.com/200x200?text=Image+Not+Found');
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${styles.image} ${!isLoaded ? styles.loading : ''} ${className || ''}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy" // Use native lazy loading
      {...props}
    />
  );
};

export default OptimizedImage;
