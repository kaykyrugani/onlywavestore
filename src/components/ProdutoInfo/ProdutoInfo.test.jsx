import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ProdutoInfo from './ProdutoInfo';
import { useCart } from '../../contexts/CartContext';

// Mock do contexto do carrinho
jest.mock('../../contexts/CartContext', () => ({
  useCart: jest.fn()
}));

// Mock do toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('ProdutoInfo', () => {
  const mockProduto = {
    id: 1,
    nome: 'Tênis Nike Air Max',
    preco: 499.99,
    estoque: 10,
    promocao: true,
    divisao: '3x de R$ 166,66',
    marca: 'Nike',
    modelo: 'Air Max',
    cor: 'Preto',
    tamanho: '42'
  };

  beforeEach(() => {
    useCart.mockReturnValue({
      addToCart: jest.fn()
    });
  });

  it('deve renderizar corretamente as informações do produto', () => {
    render(<ProdutoInfo produto={mockProduto} />);

    expect(screen.getByText(mockProduto.nome)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${mockProduto.preco.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText('Em estoque: 10 unidades')).toBeInTheDocument();
  });

  it('deve mostrar desconto quando o produto está em promoção', () => {
    render(<ProdutoInfo produto={mockProduto} />);

    const precoComDesconto = mockProduto.preco * 0.9;
    expect(screen.getByText(`R$ ${precoComDesconto.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${mockProduto.preco.toFixed(2)}`)).toHaveStyle('text-decoration: line-through');
  });

  it('deve permitir alterar a quantidade do produto', () => {
    render(<ProdutoInfo produto={mockProduto} />);

    const inputQuantidade = screen.getByLabelText('Quantidade:');
    fireEvent.change(inputQuantidade, { target: { value: '3' } });

    expect(inputQuantidade.value).toBe('3');
  });

  it('não deve permitir quantidade maior que o estoque', () => {
    render(<ProdutoInfo produto={mockProduto} />);

    const inputQuantidade = screen.getByLabelText('Quantidade:');
    fireEvent.change(inputQuantidade, { target: { value: '15' } });

    expect(inputQuantidade.value).toBe('10');
  });

  it('deve adicionar produto ao carrinho quando clicar no botão', async () => {
    const mockAddToCart = jest.fn();
    useCart.mockReturnValue({ addToCart: mockAddToCart });

    render(<ProdutoInfo produto={mockProduto} />);

    const botaoComprar = screen.getByText('Adicionar ao Carrinho');
    await act(async () => {
      fireEvent.click(botaoComprar);
    });

    expect(mockAddToCart).toHaveBeenCalledWith({
      ...mockProduto,
      quantidade: 1
    });
  });

  it('deve mostrar mensagem de indisponível quando estoque é zero', () => {
    const produtoSemEstoque = { ...mockProduto, estoque: 0 };
    render(<ProdutoInfo produto={produtoSemEstoque} />);

    expect(screen.getByText('Fora de estoque')).toBeInTheDocument();
    expect(screen.getByText('Indisponível')).toBeInTheDocument();
  });

  it('deve calcular o frete corretamente', async () => {
    render(<ProdutoInfo produto={mockProduto} />);

    const cepInput = screen.getByPlaceholderText('Digite seu CEP');
    const botaoCalcular = screen.getByText('Calcular');

    await act(async () => {
      fireEvent.change(cepInput, { target: { value: '12345-678' } });
      fireEvent.click(botaoCalcular);
    });

    // Aqui você pode adicionar expectativas para o cálculo do frete
    // dependendo da implementação real
  });
}); 