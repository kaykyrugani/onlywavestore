import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
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
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const cartRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();
  
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
      // Resetar o estado do modal quando o carrinho é fechado
      setShowClearCartModal(false);
      setShowRemoveItemModal(false);
      setItemToRemove(null);
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

  // Função para lidar com a diminuição de quantidade
  const handleDecrementQuantity = (item) => {
    if (item.quantity <= 1) {
      // Se só tiver uma unidade, mostrar modal de confirmação
      setItemToRemove(item);
      setShowRemoveItemModal(true);
    } else {
      // Se tiver mais de uma unidade, diminuir normalmente
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  // Função para lidar com o aumento de quantidade
  const handleIncrementQuantity = (item) => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  // Função para limpar o carrinho
  const handleClearCart = () => {
    onClearCart();
    setShowClearCartModal(false);
  };

  // Função para remover um item com confirmação
  const handleRemoveItem = () => {
    if (itemToRemove) {
      onRemoveItem(itemToRemove.id);
      setShowRemoveItemModal(false);
      setItemToRemove(null);
    }
  };
  
  // Manipulador para navegação
  const handleNavigate = (path) => {
    // Primeiro fechar o carrinho
    setIsVisible(false);
    
    // Usar um timeout para garantir que o carrinho está fechado antes de navegar
    setTimeout(() => {
      navigate(path);
    }, 300); // Tempo suficiente para a animação de fechamento
  };
  
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
                onClick={() => handleNavigate('/')}
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.tamanho || item.size}`} className={styles['cart-item']}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles['cart-item-image']}
                />
                <div className={styles['cart-item-details']}>
                  <h3>{item.name}</h3>
                  <div className={styles.itemSize}>
                    Tamanho: <span>{item.size || item.tamanho}</span>
                  </div>
                  <p>R$ {item.price.toFixed(2)}</p>
                  
                  <div className={styles['quantity-controls']}>
                    <button 
                      onClick={() => handleDecrementQuantity(item)}
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrementQuantity(item)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  className={styles['remove-item']}
                  onClick={() => {
                    setItemToRemove(item);
                    setShowRemoveItemModal(true);
                  }}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <>
            <div className={styles.cartSummary}>
              <div className={styles.summaryItem}>
                <span>Subtotal:</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total:</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className={styles.cartFooter}>
              <div className={styles.continueShoppingBtnWrapper}>
                <button 
                  className={styles.continueShoppingBtn}
                  onClick={() => handleNavigate('/')}
                >
                  Continuar comprando
                </button>
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
                  onClick={() => handleNavigate('/teste')}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Modal de confirmação para limpar carrinho */}
      {showClearCartModal && (
        <div className={styles.clearCartModalOverlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.clearCartModal}>
            <h3>Tem certeza que deseja limpar o carrinho?</h3>
            <div className={styles.modalButtons}>
              <button onClick={handleClearCart}>
                Sim, limpar
              </button>
              <button onClick={() => setShowClearCartModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação para remover item */}
      {showRemoveItemModal && itemToRemove && (
        <div className={styles.clearCartModalOverlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.clearCartModal}>
            <h3>Tem certeza que deseja remover este item?</h3>
            <p>{itemToRemove.name} - Tamanho: {itemToRemove.size || itemToRemove.tamanho}</p>
            <div className={styles.modalButtons}>
              <button onClick={handleRemoveItem}>
                Sim, remover
              </button>
              <button onClick={() => {
                setShowRemoveItemModal(false);
                setItemToRemove(null);
              }}>
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
