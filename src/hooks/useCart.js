import { useState, useEffect } from 'react';
import { useCache } from './useCache';

const SHIPPING_COST = 10;
const DISCOUNT_CODES = {
  'WELCOME10': 0.1,
  'SUMMER20': 0.2,
  'BLACKFRIDAY30': 0.3
};

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const { getCache, setCache } = useCache();

  useEffect(() => {
    const savedCart = getCache('cart');
    if (savedCart) {
      setItems(savedCart);
    }
  }, []);

  useEffect(() => {
    setCache('cart', items);
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems(currentItems =>
      currentItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
  };

  const applyDiscount = (code) => {
    const discountRate = DISCOUNT_CODES[code.toUpperCase()];
    if (discountRate) {
      setDiscount(subtotal * discountRate);
    }
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal - discount + SHIPPING_COST;

  return {
    items,
    subtotal,
    shipping: SHIPPING_COST,
    discount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount
  };
}; 