import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

function Cart({ isOpen, onClose, cartItems, updateCartItem, clearCart }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Seu Carrinho</h2>
        <button onClick={onClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Seu carrinho está vazio</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>R$ {item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => updateCartItem(item.id, 0)}
                className="remove-item"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-button">Finalizar Compra</button>
          <button onClick={clearCart} className="clear-cart-button">
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
