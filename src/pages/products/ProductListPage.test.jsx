import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductListPage from './ProductListPage';
import { productsService } from '@/services';

// Mock do productsService
jest.mock('@/services', () => ({
  productsService: {
    getProducts: jest.fn(),
    getCategories: jest.fn(),
  },
}));

// Mock dos produtos
const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: 'product1.jpg',
    category: 'Category 1',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    image: 'product2.jpg',
    category: 'Category 2',
  },
];

// Mock das categorias
const mockCategories = ['Category 1', 'Category 2'];

describe('ProductListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    productsService.getProducts.mockResolvedValue(mockProducts);
    productsService.getCategories.mockResolvedValue(mockCategories);
  });

  it('should render products list', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should filter products by category', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const categorySelect = screen.getByLabelText('Categoria');
    fireEvent.change(categorySelect, { target: { value: 'Category 1' } });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('should sort products by price', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const sortSelect = screen.getByLabelText('Ordenar por');
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    const products = screen.getAllByTestId('product-card');
    expect(products[0]).toHaveTextContent('Product 1');
    expect(products[1]).toHaveTextContent('Product 2');
  });

  it('should search products', async () => {
    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('should handle loading state', () => {
    productsService.getProducts.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    productsService.getProducts.mockRejectedValue(new Error('Failed to fetch products'));

    render(
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar produtos')).toBeInTheDocument();
    });
  });
}); 