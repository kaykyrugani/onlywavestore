import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProdutoCarrossel.module.css';

const ProdutoCarrossel = ({ images, selectedImage, onSelectImage }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className={styles.carrosselContainer}>
      <div className={styles.imagemPrincipalContainer}>
        <motion.div
          className={styles.imagemPrincipal}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundImage: `url(${images[selectedImage]})`,
            backgroundPosition: isZoomed
              ? `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
              : 'center',
            backgroundSize: isZoomed ? '200%' : 'cover'
          }}
        />
      </div>

      <div className={styles.miniaturasContainer}>
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={`${styles.miniatura} ${
              index === selectedImage ? styles.miniaturaAtiva : ''
            }`}
            onClick={() => onSelectImage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={image} alt={`Miniatura ${index + 1}`} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className={styles.zoomOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.zoomText}>
              Mova o mouse para zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProdutoCarrossel; 