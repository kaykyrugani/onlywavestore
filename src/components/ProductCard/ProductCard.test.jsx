import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../../contexts/CartContext';

// Mock do useCart hook
jest.mock('../../contexts/CartContext', () => ({
  ...jest.requireActual('../../contexts/CartContext'),
  useCart: () => ({
    addToCart: jest.fn()
  })
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    nome: 'Tênis Esportivo',
    imagem: 'test-image.jpg',
    preco: 299.99,
    promocao: true,
    avaliacoes: 4.5,
    divisao: '12x de <span>24,99</span> sem juros'
  };

  test('renders product information correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Tênis Esportivo')).toBeInTheDocument();
    expect(screen.getByText('R$ 299,99')).toBeInTheDocument();
    expect(screen.getByText('R$ 269,99')).toBeInTheDocument(); // 10% discount
    expect(screen.getByText('Comprar')).toBeInTheDocument();
  });

  test('displays discount tag when product is on promotion', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  test('does not display discount tag when product is not on promotion', () => {
    const productWithoutPromotion = { ...mockProduct, promocao: false };
    render(
      <CartProvider>
        <ProductCard product={productWithoutPromotion} />
      </CartProvider>
    );

    expect(screen.queryByText('-10%')).not.toBeInTheDocument();
  });

  test('renders correct number of stars based on rating', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    // 4.5 rating should show 4 filled stars and 1 empty star
    const filledStars = document.querySelectorAll('.starFilled');
    const emptyStars = document.querySelectorAll('.starEmpty');
    expect(filledStars.length).toBe(4);
    expect(emptyStars.length).toBe(1);
  });

  test('calls addToCart when buy button is clicked', () => {
    const { useCart } = require('../../contexts/CartContext');
    const { addToCart } = useCart();

    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const buyButton = screen.getByText('Comprar');
    fireEvent.click(buyButton);

    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
