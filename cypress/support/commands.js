// Comando para fazer login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});

// Comando para adicionar produto ao carrinho
Cypress.Commands.add('addToCart', (productId) => {
  cy.get(`[data-testid="add-to-cart-${productId}"]`).click();
});

// Comando para remover produto do carrinho
Cypress.Commands.add('removeFromCart', (productId) => {
  cy.get(`[data-testid="remove-from-cart-${productId}"]`).click();
});

// Comando para limpar o carrinho
Cypress.Commands.add('clearCart', () => {
  cy.get('[data-testid="clear-cart-button"]').click();
});

// Comando para finalizar a compra
Cypress.Commands.add('checkout', () => {
  cy.get('[data-testid="checkout-button"]').click();
});

// Comando para preencher o formulário de endereço
Cypress.Commands.add('fillAddressForm', (address) => {
  cy.get('[data-testid="zipcode-input"]').type(address.zipcode);
  cy.get('[data-testid="street-input"]').type(address.street);
  cy.get('[data-testid="number-input"]').type(address.number);
  cy.get('[data-testid="complement-input"]').type(address.complement);
  cy.get('[data-testid="neighborhood-input"]').type(address.neighborhood);
  cy.get('[data-testid="city-input"]').type(address.city);
  cy.get('[data-testid="state-input"]').type(address.state);
});

// Comando para preencher o formulário de pagamento
Cypress.Commands.add('fillPaymentForm', (payment) => {
  cy.get('[data-testid="card-number-input"]').type(payment.cardNumber);
  cy.get('[data-testid="card-name-input"]').type(payment.cardName);
  cy.get('[data-testid="card-expiry-input"]').type(payment.cardExpiry);
  cy.get('[data-testid="card-cvv-input"]').type(payment.cardCvv);
});

// Comando para verificar se o produto está no carrinho
Cypress.Commands.add('checkProductInCart', (productId) => {
  cy.get(`[data-testid="cart-item-${productId}"]`).should('exist');
});

// Comando para verificar se o produto não está no carrinho
Cypress.Commands.add('checkProductNotInCart', (productId) => {
  cy.get(`[data-testid="cart-item-${productId}"]`).should('not.exist');
});

// Comando para verificar se o carrinho está vazio
Cypress.Commands.add('checkEmptyCart', () => {
  cy.get('[data-testid="empty-cart-message"]').should('exist');
});

// Comando para verificar se o carrinho não está vazio
Cypress.Commands.add('checkNotEmptyCart', () => {
  cy.get('[data-testid="empty-cart-message"]').should('not.exist');
});

// Comando para verificar se o pedido foi finalizado
Cypress.Commands.add('checkOrderSuccess', () => {
  cy.get('[data-testid="order-success-message"]').should('exist');
});

// Comando para verificar se o pedido não foi finalizado
Cypress.Commands.add('checkOrderError', () => {
  cy.get('[data-testid="order-error-message"]').should('exist');
}); 