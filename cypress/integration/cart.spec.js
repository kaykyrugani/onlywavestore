describe('Carrinho', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve adicionar produto ao carrinho', () => {
    cy.addToCart('1');
    cy.checkProductInCart('1');
  });

  it('Deve remover produto do carrinho', () => {
    cy.addToCart('1');
    cy.removeFromCart('1');
    cy.checkProductNotInCart('1');
  });

  it('Deve limpar o carrinho', () => {
    cy.addToCart('1');
    cy.addToCart('2');
    cy.clearCart();
    cy.checkEmptyCart();
  });

  it('Deve finalizar a compra', () => {
    cy.addToCart('1');
    cy.checkout();
    cy.fillAddressForm({
      zipcode: '12345-678',
      street: 'Rua Teste',
      number: '123',
      complement: 'Apto 123',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'SP',
    });
    cy.fillPaymentForm({
      cardNumber: '4111111111111111',
      cardName: 'Teste Teste',
      cardExpiry: '12/25',
      cardCvv: '123',
    });
    cy.checkOrderSuccess();
  });

  it('Deve mostrar erro ao finalizar compra com carrinho vazio', () => {
    cy.checkout();
    cy.checkOrderError();
  });

  it('Deve mostrar erro ao finalizar compra com dados inválidos', () => {
    cy.addToCart('1');
    cy.checkout();
    cy.fillAddressForm({
      zipcode: '12345-678',
      street: 'Rua Teste',
      number: '123',
      complement: 'Apto 123',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'SP',
    });
    cy.fillPaymentForm({
      cardNumber: '4111111111111111',
      cardName: 'Teste Teste',
      cardExpiry: '12/25',
      cardCvv: '123',
    });
    cy.checkOrderError();
  });
}); 