import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../contexts/CartContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cart from "../../components/Cart/cart";
import Modal from "../../components/Modal/Modal";
import "./style.css";

function HomePageHeader() {
  const navigate = useNavigate();

  const {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    updateCartItem,
    clearCart,
  } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const menuRef = useRef(null);

  return (
    <div className="Header">
      <div className="Desconto">
        <p>RECEBA 5% DE DESCONTO VIA PIX</p>
      </div>
      <div className="BuscaHeader">
        <div className="Logo">
          <Link to="/">
            <img src="" alt="Logo" />
          </Link>
        </div>
        <SearchBar />
        <div className="Iconsbusac">
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
        {/* ... menu aqui */}
        <button onClick={() => setIsModalOpen(true)}>
          Limpar Sacola
        </button>
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
        onClose={closeModal}
      >
        <h3>Você quer remover todos os itens da sacola?</h3>
        <div className="modal-buttons">
          <button onClick={() => {
            clearCart();
            closeModal();
          }}>
            Sim
          </button>
          <button onClick={closeModal}>
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default HomePageHeader;
