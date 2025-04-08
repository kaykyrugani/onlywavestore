import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Image.css';

const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallback = '/images/placeholder.webp',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Gerar URLs para diferentes formatos
  const generateSrcSet = (url) => {
    const formats = {
      webp: 'image/webp',
      avif: 'image/avif',
      jpg: 'image/jpeg',
    };

    return Object.entries(formats)
      .map(([format, type]) => {
        const formatUrl = url.replace(/\.[^/.]+$/, `.${format}`);
        return `${formatUrl} 1x, ${formatUrl.replace(/\.[^/.]+$/, `@2x.${format}`)} 2x`;
      })
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div
      className={`image-wrapper ${className} ${isLoading ? 'loading' : ''}`}
      style={{ width, height }}
    >
      {isLoading && <div className="image-skeleton" />}
      
      <picture>
        <source
          type="image/webp"
          srcSet={generateSrcSet(src)}
        />
        <source
          type="image/avif"
          srcSet={generateSrcSet(src)}
        />
        <img
          src={hasError ? fallback : src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`image ${isLoading ? 'image-hidden' : ''}`}
          {...props}
        />
      </picture>
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image; 