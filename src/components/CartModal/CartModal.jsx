import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/format';
import './CartModal.css';

const CartModal = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateCartItem, 
    removeFromCart,
    getTotalItems,
    getTotal 
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleIncrement = (item) => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="cart-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
      >
        <motion.div
          className="cart-modal"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="cart-modal-header">
            <h2>Carrinho ({getTotalItems()} itens)</h2>
            <button onClick={closeCart} className="close-button">
              ×
            </button>
          </div>

          <div className="cart-modal-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Seu carrinho está vazio</p>
                <button onClick={closeCart}>Continuar Comprando</button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Tamanho: {item.size}</p>
                      <p className="price">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrement(item)}>+</button>
                      </div>
                      <button 
                        onClick={() => handleRemove(item)}
                        className="remove-button"
                      >
                        Remover
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-modal-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">
                  {formatCurrency(getTotal())}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                className="checkout-button"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal; 