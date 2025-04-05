import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Cart.module.css';

const Cart = ({ 
  isOpen, 
  onClose, 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onCheckout 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const cartRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Calcular o total do carrinho
  const cartTotal = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  // Gerenciar a visibilidade do carrinho
  useEffect(() => {
    if (isOpen) {
      // Primeiro renderiza o componente, depois adiciona as classes de visibilidade
      // para garantir que a transição funcione
      document.body.style.overflow = 'hidden';
      
      // Pequeno delay para garantir que o DOM foi atualizado
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // O componente será removido pelo useEffect abaixo quando a transição terminar
    }
  }, [isOpen]);
  
  // Lidar com a transição de saída
  useEffect(() => {
    if (!isVisible && overlayRef.current) {
      const handleTransitionEnd = (e) => {
        // Garantir que estamos ouvindo apenas o evento do elemento cart
        if (e.target === cartRef.current) {
          document.body.style.overflow = 'auto';
          onClose();
          // Remover o listener após o uso
          cartRef.current?.removeEventListener('transitionend', handleTransitionEnd);
        }
      };
      
      cartRef.current?.addEventListener('transitionend', handleTransitionEnd);
      
      // Cleanup
      return () => {
        cartRef.current?.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [isVisible, onClose]);
  
  // Lidar com tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible]);
  
  // Não renderizar nada se o carrinho nunca foi aberto
  if (!isOpen && !isVisible) return null;
  
  return createPortal(
    <div 
      ref={overlayRef}
      className={`${styles.cartOverlay} ${isVisible ? styles.cartOverlayVisible : ''}`}
      onClick={() => setIsVisible(false)}
      aria-modal="true"
      role="dialog"
      aria-label="Carrinho de compras"
    >
      <div 
        ref={cartRef}
        className={`${styles.cart} ${isVisible ? styles.cartVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.cartHeader}>
          <h2>Seu Carrinho</h2>
          <button 
            className={styles.closeButton} 
            onClick={() => setIsVisible(false)}
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>
        
        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>🛒</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos para continuar comprando</p>
              <button 
                className={styles.backToShopBtn}
                onClick={() => setIsVisible(false)}
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className={styles['cart-item']}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles['cart-item-image']}
                />
                <div className={styles['cart-item-details']}>
                  <h3>{item.name}</h3>
                  <p>R$ {item.price.toFixed(2)}</p>
                  
                  <div className={styles['quantity-controls']}>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      aria-label="Diminuir quantidade"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  className={styles['remove-item']}
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span>Total:</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            
            <div className={styles.cartActions}>
              <button 
                className={styles.clearButton}
                onClick={() => setShowClearCartModal(true)}
              >
                Limpar
              </button>
              <button 
                className={styles.checkoutButton}
                onClick={onCheckout}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de confirmação para limpar carrinho */}
      {showClearCartModal && (
        <div className={styles.clearCartModalOverlay}>
          <div className={styles.clearCartModal}>
            <h3>Tem certeza que deseja limpar o carrinho?</h3>
            <div className={styles.modalButtons}>
              <button onClick={() => {
                onClearCart();
                setShowClearCartModal(false);
              }}>
                Sim, limpar
              </button>
              <button onClick={() => setShowClearCartModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default Cart;
