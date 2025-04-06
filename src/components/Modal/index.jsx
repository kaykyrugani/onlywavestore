import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, title, message, buttons, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose || (() => {})}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          )}
        </div>
        <div className={styles.content}>
          {message && <p>{message}</p>}

          {buttons && buttons.length > 0 && (
            <div className={styles.modalButtons}>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={`${styles.modalButton} ${button.primary ? styles.primary : styles.secondary}`}
                  onClick={button.onClick}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal; 