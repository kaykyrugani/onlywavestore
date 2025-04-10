import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';
import { menuItems } from '../Header';
import styles from './MobMenu.module.css';

const MobMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Configuração do swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isOpen) {
        handleClose();
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Trap focus dentro do menu
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    menu.addEventListener('keydown', handleTab);
    return () => menu.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Feedback tátil
  const handleClose = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    onClose();
  };

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`} 
        onClick={handleClose}
      />
      <div 
        {...swipeHandlers}
        ref={menuRef}
        className={`${styles.mobMenu} ${isOpen ? styles.active : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button 
          ref={closeButtonRef}
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Fechar menu"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <nav className={styles.mobNav}>
          <div className={styles.accountLinks}>
            <Link to="/conta" className={styles.accountLink} onClick={handleClose}>
              <FontAwesomeIcon icon={faUser} className={styles.accountIcon} />
              Minha conta
            </Link>
            <Link to="/carrinho" className={styles.accountLink} onClick={handleClose}>
              <FontAwesomeIcon icon={faShoppingCart} className={styles.accountIcon} />
              Carrinho
            </Link>
          </div>
          
          {menuItems.map((item) => (
            <div key={item.id} className={styles.mobMenuItem}>
              <Link 
                to={`/produtos/${item.id}`} 
                className={styles.mobMenuLink}
                onClick={handleClose}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobMenu; 