import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AvaliacaoModal from './AvaliacaoModal';

describe('AvaliacaoModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClose.mockClear();
  });

  it('deve renderizar o modal quando isOpen é true', () => {
    render(
      <AvaliacaoModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Avaliar Produto')).toBeInTheDocument();
  });

  it('não deve renderizar o modal quando isOpen é false', () => {
    render(
      <AvaliacaoModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.queryByText('Avaliar Produto')).not.toBeInTheDocument();
  });

  it('deve fechar o modal quando clicar no overlay', () => {
    render(
      <AvaliacaoModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deve validar o formulário corretamente', async () => {
    render(
      <AvaliacaoModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const botaoEnviar = screen.getByText('Enviar Avaliação');
    await act(async () => {
      fireEvent.click(botaoEnviar);
    });

    expect(screen.getByText('Nome deve ter pelo menos 2 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
    expect(screen.getByText('Título deve ter pelo menos 5 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Comentário deve ter pelo menos 10 caracteres')).toBeInTheDocument();
  });

  it('deve enviar o formulário com dados válidos', async () => {
    render(
      <AvaliacaoModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Preencher o formulário com dados válidos
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'João Silva' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'joao@exemplo.com' }
    });
    fireEvent.click(screen.getByLabelText('5 estrelas'));
    fireEvent.change(screen.getByLabelText('Título da Avaliação'), {
      target: { value: 'Ótimo produto!' }
    });
    fireEvent.change(screen.getByLabelText('Comentário'), {
      target: { value: 'Produto excelente, superou minhas expectativas.' }
    });

    const botaoEnviar = screen.getByText('Enviar Avaliação');
    await act(async () => {
      fireEvent.click(botaoEnviar);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      nota: 5,
      titulo: 'Ótimo produto!',
      comentario: 'Produto excelente, superou minhas expectativas.',
      data: expect.any(String)
    });
  });

  it('deve mostrar loading durante o envio', async () => {
    render(
      <AvaliacaoModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Preencher o formulário com dados válidos
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'João Silva' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'joao@exemplo.com' }
    });
    fireEvent.click(screen.getByLabelText('5 estrelas'));
    fireEvent.change(screen.getByLabelText('Título da Avaliação'), {
      target: { value: 'Ótimo produto!' }
    });
    fireEvent.change(screen.getByLabelText('Comentário'), {
      target: { value: 'Produto excelente, superou minhas expectativas.' }
    });

    const botaoEnviar = screen.getByText('Enviar Avaliação');
    await act(async () => {
      fireEvent.click(botaoEnviar);
    });

    expect(screen.getByText('Enviando...')).toBeInTheDocument();
  });
}); 