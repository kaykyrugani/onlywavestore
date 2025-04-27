import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSkeleton.module.css';

const LoadingSkeleton = ({ type = 'produto' }) => {
  const skeletonVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1
      }
    }
  };

  if (type === 'produto') {
    return (
      <div className={styles.produtoSkeleton}>
        <div className={styles.skeletonGrid}>
          <motion.div 
            className={styles.skeletonImage}
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
          <div className={styles.skeletonInfo}>
            <motion.div 
              className={styles.skeletonTitle}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className={styles.skeletonPrice}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className={styles.skeletonDescription}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className={styles.skeletonButton}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
        <div className={styles.skeletonSections}>
          <motion.div 
            className={styles.skeletonSection}
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className={styles.skeletonSection}
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className={styles.skeletonSection}
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton; 