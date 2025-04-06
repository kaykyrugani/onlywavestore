import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './CartItem.module.css';

const CartItem = ({ item, updateCartItem }) => {
  const handleIncrement = () => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      updateCartItem(item.id, 0); // Remove o item quando a quantidade chega a zero
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.itemDetails}>
        <h3>{item.name}</h3>
        <div className={styles.itemSize}>
          Tamanho: <span>{item.size || item.tamanho}</span>
        </div>
        <p className={styles.itemPrice}>R$ {item.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
          <button onClick={handleDecrement}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;