import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartModal from "./CartModal";
import { CartContext } from "../../contexts/CartContext";

// Mock data
const mockCartItems = [
  {
    id: 1,
    name: "Tênis Teste",
    price: 199.9,
    quantity: 2,
    image: "/assets/placeholder.png",
    size: "42"
  },
  {
    id: 2,
    name: "Camiseta Teste",
    price: 89.9,
    quantity: 1,
    image: "/assets/placeholder.png",
    size: "M"
  }
];

const mockContext = {
  cartItems: mockCartItems,
  isCartOpen: true,
  openCart: jest.fn(),
  closeCart: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  getTotal: () => 199.9 * 2 + 89.9,
};

describe("CartModal", () => {
  it("renderiza os itens do carrinho", () => {
    render(
      <CartContext.Provider value={mockContext}>
        <CartModal />
      </CartContext.Provider>
    );
    expect(screen.getByText("Tênis Teste")).toBeInTheDocument();
    expect(screen.getByText("Camiseta Teste")).toBeInTheDocument();
    expect(screen.getByText("R$ 199,90")).toBeInTheDocument();
    expect(screen.getByText("R$ 89,90")).toBeInTheDocument();
  });

  it("chama closeCart ao clicar no botão de fechar", () => {
    render(
      <CartContext.Provider value={mockContext}>
        <CartModal />
      </CartContext.Provider>
    );
    const closeButton = screen.getByLabelText(/fechar/i);
    fireEvent.click(closeButton);
    expect(mockContext.closeCart).toHaveBeenCalled();
  });

  it("chama clearCart ao clicar em 'Limpar Carrinho'", () => {
    render(
      <CartContext.Provider value={mockContext}>
        <CartModal />
      </CartContext.Provider>
    );
    const clearButton = screen.getByText(/limpar carrinho/i);
    fireEvent.click(clearButton);
    expect(mockContext.clearCart).toHaveBeenCalled();
  });

  it("mostra o valor total do carrinho", () => {
    render(
      <CartContext.Provider value={mockContext}>
        <CartModal />
      </CartContext.Provider>
    );
    expect(screen.getByText(/total/i)).toHaveTextContent("R$ 489,70");
  });
});
