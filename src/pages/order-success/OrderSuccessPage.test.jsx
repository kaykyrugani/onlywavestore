import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import OrderSuccessPage from './OrderSuccessPage';
import { ordersService } from '@/services';

// Mock do useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock do ordersService
jest.mock('@/services', () => ({
  ordersService: {
    getOrderById: jest.fn(),
  },
}));

describe('OrderSuccessPage', () => {
  const mockOrder = {
    id: 1,
    status: 'completed',
    total: 100,
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 1,
        size: 'M',
      },
    ],
    shipping: {
      method: 'standard',
      cost: 15,
      address: {
        street: 'Test Street',
        number: '123',
        complement: 'Apt 4',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345-678',
      },
    },
    payment: {
      method: 'credit_card',
      cardLastDigits: '1234',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ id: '1' });
  });

  it('should render order details', async () => {
    ordersService.getOrderById.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pedido Confirmado!')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    ordersService.getOrderById.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    ordersService.getOrderById.mockRejectedValue(new Error('Failed to fetch order'));

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar pedido')).toBeInTheDocument();
    });
  });

  it('should display shipping information', async () => {
    ordersService.getOrderById.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Street, 123')).toBeInTheDocument();
      expect(screen.getByText('Test Neighborhood')).toBeInTheDocument();
      expect(screen.getByText('Test City - TS')).toBeInTheDocument();
      expect(screen.getByText('12345-678')).toBeInTheDocument();
    });
  });

  it('should display payment information', async () => {
    ordersService.getOrderById.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument();
      expect(screen.getByText('Final 1234')).toBeInTheDocument();
    });
  });

  it('should display order summary', async () => {
    ordersService.getOrderById.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
      expect(screen.getByText('Frete')).toBeInTheDocument();
      expect(screen.getByText('R$ 15,00')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('R$ 115,00')).toBeInTheDocument();
    });
  });

  it('should display order date', async () => {
    ordersService.getOrderById.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <OrderSuccessPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    });
  });
}); 