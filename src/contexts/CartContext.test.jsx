import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { 
    cartItems, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getSubtotal 
  } = useCart();

  return (
    <div>
      <p data-testid="total-items">{getTotalItems()}</p>
      <p data-testid="subtotal">{getSubtotal().toFixed(2)}</p>
      <button 
        data-testid="add-item" 
        onClick={() => addToCart({ id: 1, nome: 'Test Product', preco: 100, promocao: false })}
      >
        Add Item
      </button>
      <button 
        data-testid="update-item" 
        onClick={() => updateCartItem(1, 3)}
      >
        Update Item
      </button>
      <button 
        data-testid="remove-item" 
        onClick={() => removeFromCart(1)}
      >
        Remove Item
      </button>
      <button 
        data-testid="clear-cart" 
        onClick={clearCart}
      >
        Clear Cart
      </button>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('initializes with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0.00');
  });

  test('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('100.00');
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
  });

  test('updates item quantity in cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('update-item'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('300.00');
  });

  test('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('remove-item'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0.00');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
  });

  test('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('clear-cart'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0.00');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
  });

  test('persists cart to localStorage', () => {
    const { unmount } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    
    // Unmount and remount to test persistence
    unmount();
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('100.00');
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
  });
});
