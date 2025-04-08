import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './Cart.css';

export const Cart = ({ onClose }) => {
  const {
    items,
    total,
    subtotal,
    shipping,
    discount,
    updateQuantity,
    removeItem,
    applyDiscount,
    clearCart
  } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleDiscountSubmit = (e) => {
    e.preventDefault();
    const code = e.target.discountCode.value;
    applyDiscount(code);
  };

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <h2 className="cart__title">Seu carrinho está vazio</h2>
        <p className="cart__empty-text">
          Adicione produtos para começar suas compras
        </p>
        <Button
          variant="primary"
          onClick={onClose}
          className="cart__continue-shopping"
        >
          Continuar Comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h2 className="cart__title">Seu Carrinho</h2>
        <button className="cart__close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="cart__items">
        {items.map((item) => (
          <div key={item.id} className="cart__item">
            <img
              src={item.image}
              alt={item.name}
              className="cart__item-image"
            />
            <div className="cart__item-details">
              <h3 className="cart__item-name">{item.name}</h3>
              <p className="cart__item-price">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.price)}
              </p>
              <div className="cart__item-quantity">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min="1"
                  className="cart__quantity-input"
                />
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <button
              className="cart__item-remove"
              onClick={() => removeItem(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart__summary">
        <form onSubmit={handleDiscountSubmit} className="cart__discount">
          <Input
            name="discountCode"
            placeholder="Código de desconto"
            className="cart__discount-input"
          />
          <Button type="submit" variant="outline">
            Aplicar
          </Button>
        </form>

        <div className="cart__totals">
          <div className="cart__total-row">
            <span>Subtotal</span>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(subtotal)}
            </span>
          </div>
          {discount > 0 && (
            <div className="cart__total-row cart__total-row--discount">
              <span>Desconto</span>
              <span>
                -{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(discount)}
              </span>
            </div>
          )}
          <div className="cart__total-row">
            <span>Frete</span>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(shipping)}
            </span>
          </div>
          <div className="cart__total-row cart__total-row--total">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total)}
            </span>
          </div>
        </div>

        <div className="cart__actions">
          <Button
            variant="outline"
            onClick={clearCart}
            className="cart__clear"
          >
            Limpar Carrinho
          </Button>
          <Button
            variant="primary"
            className="cart__checkout"
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func.isRequired
}; 