import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import CartItem from './cartitem';
import './Cart.css';

Modal.setAppElement('#root'); // Importante para acessibilidade

const Cart = ({ isOpen, onClose, cartItems, updateCartItem, clearCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleClearCart = () => {
    setIsModalOpen(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setIsModalOpen(false);
    toast.success('Carrinho esvaziado com sucesso!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onClick={onClose}
            />
            
            <motion.div 
              className="cart-container"
              initial={{ x: -700 }}
              animate={{ x: 0 }}
              exit={{ x: -700 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="cart-header">
                <h2>Seu carrinho</h2>
                <button className="close-button" onClick={onClose}>
                  <FaTimes />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <FaShoppingCart className="empty-cart-icon" />
                  <h3>Seu carrinho está vazio!</h3>
                  <p>OnlyWave - Sua moda, nossa onda</p>
                  <button className="back-to-shop-btn" onClick={onClose}>
                    Voltar à loja
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        updateCartItem={updateCartItem} 
                      />
                    ))}
                  </div>
                  
                  <div className="cart-footer">
                    <h4>Produtos na sacola: {totalItems}</h4>
                    <h4 className="subtotal">Subtotal: R$ {subtotal.toFixed(2)}</h4>
                    <div className="cart-buttons">
                      <button className="checkout-btn">Finalizar Compra</button>
                      <button className="clear-cart-btn" onClick={handleClearCart}>
                        Limpar Sacola
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="clear-cart-modal"
        overlayClassName="clear-cart-modal-overlay"
      >
        <h3>Você quer remover todos os itens da sacola?</h3>
        <div className="modal-buttons">
          <button onClick={confirmClearCart}>Sim</button>
          <button onClick={closeModal}>Não</button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;