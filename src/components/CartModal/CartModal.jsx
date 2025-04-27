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
        role="presentation"
        aria-label="Fundo do modal do carrinho"
      >
        <motion.div
          className="cart-modal"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Carrinho de compras"
        >
          <div className="cart-modal-header">
            <h2 id="cart-modal-title">Carrinho ({getTotalItems()} itens)</h2>
            <button onClick={closeCart} className="close-button" aria-label="Fechar carrinho">
              ×
            </button>
          </div>
          <div className="cart-modal-content" tabIndex={0} aria-labelledby="cart-modal-title">
            {cartItems.length === 0 ? (
              <p aria-live="polite">Seu carrinho está vazio.</p>
            ) : (
              <ul aria-label="Lista de itens no carrinho">
                {cartItems.map((item) => (
                  <li key={item.id} aria-label={`Produto: ${item.name}, quantidade: ${item.quantity}`} tabIndex={0}>
                    <div className="cart-item-info">
                      <span>{item.name}</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                    <div className="cart-item-actions" role="group" aria-label="Ações do produto no carrinho">
                      <button onClick={() => handleDecrement(item)} aria-label={`Diminuir quantidade de ${item.name}`}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)} aria-label={`Aumentar quantidade de ${item.name}`}>+</button>
                      <button onClick={() => handleRemove(item)} aria-label={`Remover ${item.name} do carrinho`}>Remover</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="cart-modal-footer">
            <span aria-label="Valor total do carrinho">Total: {formatCurrency(getTotal())}</span>
            <button onClick={handleCheckout} aria-label="Finalizar compra" disabled={cartItems.length === 0}>
              Finalizar Compra
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;