import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../CartItem/cartitem';
import styles from './Cart.module.css';

const Cart = ({ isOpen, onClose, cartItems, updateCartItem, clearCart }) => {
  // Calcular o total do carrinho
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <h2>Seu Carrinho</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Seu carrinho está vazio</p>
          ) : (
            cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                updateCartItem={updateCartItem} 
              />
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className={styles.cartActions}>
              <button className={styles.clearButton} onClick={clearCart}>
                Limpar Carrinho
              </button>
              <button className={styles.checkoutButton}>
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
