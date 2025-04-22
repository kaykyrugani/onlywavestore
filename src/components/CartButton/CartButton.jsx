import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './CartButton.css';

const CartButton = () => {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.button
      className="cart-button"
      onClick={openCart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaShoppingCart size={20} />
      {totalItems > 0 && (
        <motion.span
          key={totalItems}
          className="cart-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartButton; 