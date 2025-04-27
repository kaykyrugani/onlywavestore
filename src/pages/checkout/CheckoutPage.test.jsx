import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CheckoutPage from './CheckoutPage';
import { ordersService } from '@/services';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

// Mock do ordersService
jest.mock('@/services', () => ({
  ordersService: {
    createOrder: jest.fn(),
  },
}));

// Mock do useForm
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('CheckoutPage', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockCartItems = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 1,
      size: 'M',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      watch: jest.fn(),
      setValue: jest.fn(),
    });
  });

  it('should render checkout form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Endereço de Entrega')).toBeInTheDocument();
    expect(screen.getByText('Método de Envio')).toBeInTheDocument();
    expect(screen.getByText('Método de Pagamento')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const mockOrder = {
      id: 1,
      status: 'pending',
      total: 100,
    };

    ordersService.createOrder.mockResolvedValue(mockOrder);

    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Finalizar Compra');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(ordersService.createOrder).toHaveBeenCalled();
    });
  });

  it('should handle shipping method selection', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const standardShipping = screen.getByLabelText('Standard (5-7 dias úteis)');
    fireEvent.click(standardShipping);

    expect(standardShipping).toBeChecked();
  });

  it('should handle payment method selection', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const creditCard = screen.getByLabelText('Cartão de Crédito');
    fireEvent.click(creditCard);

    expect(creditCard).toBeChecked();
  });

  it('should calculate total with shipping', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const standardShipping = screen.getByLabelText('Standard (5-7 dias úteis)');
    fireEvent.click(standardShipping);

    expect(screen.getByText('R$ 115,00')).toBeInTheDocument(); // R$ 100 + R$ 15 de frete
  });

  it('should handle error on order creation', async () => {
    ordersService.createOrder.mockRejectedValue(new Error('Failed to create order'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Finalizar Compra');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao processar pedido')).toBeInTheDocument();
    });
  });

  it('should validate required fields', () => {
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: {
          zipCode: { type: 'required', message: 'CEP é obrigatório' },
          street: { type: 'required', message: 'Rua é obrigatória' },
          number: { type: 'required', message: 'Número é obrigatório' },
        },
      },
      watch: jest.fn(),
      setValue: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CheckoutPage />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('CEP é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Rua é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Número é obrigatório')).toBeInTheDocument();
  });
}); 