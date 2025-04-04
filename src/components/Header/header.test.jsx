import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';
import { CartProvider } from '../../contexts/CartContext';

// Mock dos componentes que não queremos testar em detalhe
jest.mock('../SearchBar/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar</div>;
  };
});

jest.mock('../Cart/cart', () => {
  return function MockCart({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="cart-component">
        Cart Component
        <button onClick={onClose}>Close</button>
      </div>
    ) : null;
  };
});

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );
  };

  test('renders header with logo and navigation', () => {
    renderHeader();
    
    expect(screen.getByText('RECEBA 5% DE DESCONTO VIA PIX')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Roupas')).toBeInTheDocument();
    expect(screen.getByText('Conjuntos')).toBeInTheDocument();
    expect(screen.getByText('Acessorios')).toBeInTheDocument();
    expect(screen.getByText('Marcas')).toBeInTheDocument();
  });

  test('opens cart when cart icon is clicked', () => {
    renderHeader();
    
    const cartIcon = screen.getByRole('img', { name: /shopping cart/i });
    fireEvent.click(cartIcon);
    
    expect(screen.getByTestId('cart-component')).toBeInTheDocument();
  });

  test('closes cart when close button is clicked', () => {
    renderHeader();
    
    // Open cart
    const cartIcon = screen.getByRole('img', { name: /shopping cart/i });
    fireEvent.click(cartIcon);
    
    // Close cart
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('cart-component')).not.toBeInTheDocument();
  });

  test('shows dropdown menu when hovering over menu item', () => {
    renderHeader();
    
    const sneakersMenuItem = screen.getByText('Sneakers');
    fireEvent.mouseEnter(sneakersMenuItem);
    
    // Wait for dropdown to appear
    setTimeout(() => {
      expect(screen.getByText('Ver todos os produtos')).toBeInTheDocument();
      expect(screen.getByText('Tênis Esportivo')).toBeInTheDocument();
    }, 500);
  });

  test('hides dropdown menu when mouse leaves menu item', () => {
    renderHeader();
    
    const sneakersMenuItem = screen.getByText('Sneakers');
    fireEvent.mouseEnter(sneakersMenuItem);
    
    // Wait for dropdown to appear
    setTimeout(() => {
      expect(screen.getByText('Ver todos os produtos')).toBeInTheDocument();
      
      // Mouse leave
      fireEvent.mouseLeave(sneakersMenuItem);
      
      // Wait for dropdown to disappear
      setTimeout(() => {
        expect(screen.queryByText('Ver todos os produtos')).not.toBeInTheDocument();
      }, 500);
    }, 500);
  });

  test('navigates to correct page when menu item is clicked', () => {
    const { history } = renderHeader();
    
    const sneakersMenuItem = screen.getByText('Sneakers');
    fireEvent.click(sneakersMenuItem);
    
    // Check if navigation occurred
    expect(window.location.pathname).toBe('/produtos/tenis');
  });
});
