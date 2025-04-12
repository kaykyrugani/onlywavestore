import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faUser, 
  faShoppingCart, 
  faShoePrints, 
  faTshirt, 
  faUserFriends,
  faGlasses,
  faTags
} from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';
import { menuItems } from '../Header';
import { useCart } from '../../contexts/CartContext';
import styles from './MobMenu.module.css';

// Mapeamento de ícones para cada item do menu
const menuIcons = {
  sneakers: faShoePrints,
  roupas: faTshirt,
  conjuntos: faUserFriends,
  acessorios: faGlasses,
  marcas: faTags
};

const MobMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { openCart } = useCart();

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
      
      // Adiciona classe de animação aos itens quando o menu abre
      const items = menuRef.current?.querySelectorAll(`.${styles.menuItem}`);
      items?.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add(styles.animate);
        }, index * 100);
      });
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

  const handleCartClick = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      openCart();
    }, 300); // Espera a animação de fechamento do menu
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
            <a href="#" className={`${styles.accountLink} ${styles.menuItem}`} onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} className={styles.accountIcon} />
              <span>Carrinho</span>
            </a>
            <Link to="/conta" className={`${styles.accountLink} ${styles.menuItem}`} onClick={handleClose}>
              <FontAwesomeIcon icon={faUser} className={styles.accountIcon} />
              <span>Minha conta</span>
            </Link>
          </div>
          
          {menuItems.map((item, index) => (
            <div key={item.id} className={`${styles.mobMenuItem} ${styles.menuItem}`}>
              <Link 
                to={`/produtos/${item.id}`} 
                className={styles.mobMenuLink}
                onClick={handleClose}
              >
                <FontAwesomeIcon 
                  icon={menuIcons[item.id]} 
                  className={styles.menuIcon} 
                />
                <span>{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobMenu; 