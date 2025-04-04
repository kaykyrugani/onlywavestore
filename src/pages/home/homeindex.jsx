import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cart from '../../components/Cart/cart';
import './style.css';
import Modal from '../../components/Modal/Modal';
function Header() {
  const navigate = useNavigate();
  
  // Use o hook useCart para obter os dados do carrinho
  const { 
    cartItems, 
    isCartOpen, 
    openCart, 
    closeCart, 
    updateCartItem, 
    clearCart 
  } = useCart();

  // Calcule o total de itens ANTES de usá-lo no JSX
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Estado para controlar a abertura/fechamento do modal de confirmação
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Estado para controlar qual menu está ativo
    const [activeMenu, setActiveMenu] = useState(null);
    // Ref para controlar o timeout do debounce
    const debounceRef = useRef(null);
    // Ref para o elemento do menu ativo
    const menuRef = useRef(null);

    // ... (código existente)

    return (
        <div className='Header'>
            <div className='Desconto'>
                <p>RECEBA 5% DE DESCONBTO VIA PIX </p>
            </div>
            <div className='BuscaHeader'>
                <div className='Logo'>
                    <Link to="/">
                        <img src="" alt="" />
                    </Link>
                </div>
                <SearchBar />
                <div className='Iconsbusac'>
                    <Link to="/conta">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                    </Link>
                    <div className="cart-icon-wrapper">
                        <FontAwesomeIcon 
                            icon={faShoppingCart} 
                            onClick={openCart}
                            className="cart-icon"
                        />
                        <span className="cart-count">{totalItems}</span>
                    </div>
                </div>
            </div>
            <nav className="Navbar" ref={menuRef}>
                {/* ... (código existente) */}
            </nav>

            {/* Use o componente Cart importado em vez do código inline */}
            <Cart 
                isOpen={isCartOpen} 
                onClose={closeCart} 
                cartItems={cartItems} 
                updateCartItem={updateCartItem} 
                clearCart={clearCart} 
            />

            {/* Modal de confirmação para limpar o carrinho */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="clear-cart-modal"
                overlayClassName="clear-cart-modal-overlay"
            >
                <h3>Você quer remover todos os itens da sacola?</h3>
                <div className="modal-buttons">
                    <button onClick={clearCart}>Sim</button>
                    <button onClick={closeModal}>Não</button>
                </div>
            </Modal>
        </div>
    );
}

export default Header;
