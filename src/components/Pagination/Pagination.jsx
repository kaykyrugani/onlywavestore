import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Pagination.module.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showDots = true
}) => {
  return (
    <>
      <div className={styles.paginationContainer}>
        <button 
          className={`${styles.paginationArrow} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <div className={styles.paginationNumbers}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationNumber} ${currentPage === index + 1 ? styles.active : ''}`}
              onClick={() => onPageChange(index + 1)}
              aria-label={`Página ${index + 1}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <button 
          className={`${styles.paginationArrow} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      
      {/* Indicadores visuais (bolinhas) */}
      {showDots && totalPages > 1 && (
        <div className={styles.paginationDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.paginationDot} ${currentPage === index + 1 ? styles.active : ''}`}
              onClick={() => onPageChange(index + 1)}
              role="button"
              aria-label={`Ir para página ${index + 1}`}
              tabIndex={0}
            ></span>
          ))}
        </div>
      )}
    </>
  );
};

export default Pagination;
