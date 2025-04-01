import { FaPlus, FaMinus } from 'react-icons/fa';
import './CartItem.css';

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
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-price">R$ {item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <button onClick={handleDecrement}>
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;