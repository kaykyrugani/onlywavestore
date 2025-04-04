import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cart from '../../components/Cart/cart';
import { useCart } from '../../contexts/CartContext';
import './style.css';

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function Header() {
    const navigate = useNavigate();
    const { 
        cartItems, 
        isCartOpen, 
        openCart, 
        closeCart, 
        updateCartItem, 
        clearCart 
    } = useCart();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className='Header'>
            <div className='Desconto'>
                <p>RECEBA 5% DE DESCONTO VIA PIX </p>
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

            <Cart 
                isOpen={isCartOpen} 
                onClose={closeCart} 
                cartItems={cartItems} 
                updateCartItem={updateCartItem} 
                clearCart={clearCart} 
            />

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