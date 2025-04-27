import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Componente de teste
const TestComponent = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <div data-testid="items-count">{items.length}</div>
      <div data-testid="total-items">
        {items.reduce((total, item) => total + item.quantity, 0)}
      </div>
      <button
        onClick={() =>
          addItem({
            id: 1,
            name: 'Test Product',
            price: 100,
            image: 'test.jpg',
            size: 'M',
          })
        }
        data-testid="add-button"
      >
        Add Item
      </button>
      <button
        onClick={() => removeItem(1)}
        data-testid="remove-button"
      >
        Remove Item
      </button>
      <button
        onClick={() => updateQuantity(1, 2)}
        data-testid="update-button"
      >
        Update Quantity
      </button>
      <button onClick={clearCart} data-testid="clear-button">
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-button'));

    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
  });

  it('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item first
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');

    // Then remove it
    fireEvent.click(screen.getByTestId('remove-button'));
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('should update item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item first
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');

    // Then update quantity
    fireEvent.click(screen.getByTestId('update-button'));
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
  });

  it('should clear cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item first
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');

    // Then clear cart
    fireEvent.click(screen.getByTestId('clear-button'));
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('should load cart from localStorage', () => {
    const mockCart = [
      {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        size: 'M',
        quantity: 1,
      },
    ];

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
  });
}); 