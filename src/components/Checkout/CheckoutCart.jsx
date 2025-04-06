import React from 'react';
import styles from './CheckoutCart.module.css';

const CheckoutCart = ({ 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}) => {
  // Calcular o total do carrinho
  const cartTotal = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  // Função para lidar com a diminuição de quantidade
  const handleDecrementQuantity = (item) => {
    if (item.quantity <= 1) {
      // Se só tiver uma unidade, remover diretamente
      onRemoveItem(item.id);
    } else {
      // Se tiver mais de uma unidade, diminuir normalmente
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  // Função para lidar com o aumento de quantidade
  const handleIncrementQuantity = (item) => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className={styles.checkoutCart}>
      <div className={styles.cartHeader}>
        <h2>Seu Carrinho</h2>
      </div>
      
      <div className={styles.cartItems}>
        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h3>Seu carrinho está vazio</h3>
            <p>Adicione produtos para continuar o checkout</p>
          </div>
        ) : (
          items.map(item => (
            <div key={`${item.id}-${item.tamanho || item.size}`} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h3>{item.name}</h3>
                <div className={styles.itemSize}>
                  Tamanho: <span>{item.size || item.tamanho}</span>
                </div>
                <p>R$ {item.price.toFixed(2)}</p>
                
                <div className={styles.quantityControls}>
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
                className={styles.removeItem}
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
            <button 
              className={styles.clearButton}
              onClick={onClearCart}
            >
              Limpar Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutCart; 