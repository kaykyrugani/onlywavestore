import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { Modal } from '../../ui/Modal/Modal';
import { Cart } from '../../ui/Cart/Cart';
import './Header.css';

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          OnlyWave Store
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            Home
          </Link>
          <Link to="/produtos" className="header__nav-link">
            Produtos
          </Link>
          <Link to="/categorias" className="header__nav-link">
            Categorias
          </Link>
          <Link to="/sobre" className="header__nav-link">
            Sobre
          </Link>
        </nav>

        <div className="header__actions">
          <button
            className="header__cart-button"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="header__cart-icon">🛒</span>
            {itemCount > 0 && (
              <span className="header__cart-count">{itemCount}</span>
            )}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart onClose={() => setIsCartOpen(false)} />
      </Modal>
    </header>
  );
}; 