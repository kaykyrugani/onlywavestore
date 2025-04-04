import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCarousel from './produtoscaroussel';
import { CartProvider } from '../../contexts/CartContext';

// Mock de produtos para teste
const mockProducts = [
  { id: 1, nome: 'Produto 1', preco: 100, promocao: false, avaliacoes: 4, divisao: '2x de <span>50</span>' },
  { id: 2, nome: 'Produto 2', preco: 200, promocao: true, avaliacoes: 5, divisao: '2x de <span>100</span>' },
  { id: 3, nome: 'Produto 3', preco: 300, promocao: false, avaliacoes: 3, divisao: '3x de <span>100</span>' },
  { id: 4, nome: 'Produto 4', preco: 400, promocao: true, avaliacoes: 4, divisao: '4x de <span>100</span>' },
  { id: 5, nome: 'Produto 5', preco: 500, promocao: false, avaliacoes: 5, divisao: '5x de <span>100</span>' }
];

describe('ProductCarousel Component', () => {
  const renderCarousel = (props = {}) => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <ProductCarousel 
            products={mockProducts} 
            title="Test Products" 
            categorySlug="test-category"
            {...props}
          />
        </CartProvider>
      </BrowserRouter>
    );
  };

  test('renders carousel with title and products', () => {
    renderCarousel();
    
    expect(screen.getByText('Test Products')).toBeInTheDocument();
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('Produto 3')).toBeInTheDocument();
    expect(screen.getByText('Produto 4')).toBeInTheDocument();
  });

  test('renders "Ver mais" link with correct URL', () => {
    renderCarousel();
    
    const verMaisLink = screen.getByText('Ver mais');
    expect(verMaisLink).toBeInTheDocument();
    expect(verMaisLink.getAttribute('href')).toBe('/produtos/test-category');
  });

  test('next button is disabled when at the end of carousel', () => {
    renderCarousel();
    
    // With 5 products and 4 items per page, we have 2 pages
    // Click next to go to the last page
    const nextButton = screen.getByLabelText('Próximo slide');
    fireEvent.click(nextButton);
    
    // Now the next button should be disabled
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('navDisabled');
  });

  test('previous button is disabled when at the start of carousel', () => {
    renderCarousel();
    
    const prevButton = screen.getByLabelText('Slide anterior');
    
    // At the start, prev button should be disabled
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('navDisabled');
    
    // Click next to go to the next page
    const nextButton = screen.getByLabelText('Próximo slide');
    fireEvent.click(nextButton);
    
    // Now prev button should be enabled
    expect(prevButton).not.toBeDisabled();
    expect(prevButton).not.toHaveClass('navDisabled');
    
    // Click prev to go back to the first page
    fireEvent.click(prevButton);
    
    // Prev button should be disabled again
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('navDisabled');
  });

  test('pagination dots reflect current page', () => {
    renderCarousel();
    
    // With 5 products and 4 items per page, we have 2 pages
    const dots = screen.getAllByRole('button', { name: /Ir para slide/i });
    expect(dots.length).toBe(2);
    
    // First dot should be active initially
    expect(dots[0]).toHaveClass('active');
    expect(dots[1]).not.toHaveClass('active');
    
    // Click on the second dot
    fireEvent.click(dots[1]);
    
    // Second dot should now be active
    expect(dots[0]).not.toHaveClass('active');
    expect(dots[1]).toHaveClass('active');
  });
});
