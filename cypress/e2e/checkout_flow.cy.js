// Cypress E2E: Fluxo completo de compra OnlyWave

describe('Fluxo completo de compra', () => {
  it('Deve realizar login, adicionar produto ao carrinho e finalizar pedido', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('cliente@onlywave.com');
    cy.get('input[name=senha]').type('senhaSegura123');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/');
    cy.visit('/produtos');
    cy.get('[data-cy=produto-card]').first().click();
    cy.get('[data-cy=add-carrinho]').click();
    cy.get('[data-cy=abrir-carrinho]').click();
    cy.get('[data-cy=finalizar-compra]').click();

    // Etapa endereço
    cy.get('input[name=cep]').type('01001000');
    cy.get('input[name=endereco]').should('exist');
    cy.get('button[type=submit]').click();

    // Etapa entrega
    cy.get('[data-cy=opcao-entrega]').first().click();
    cy.get('button[type=submit]').click();

    // Etapa pagamento
    cy.get('input[name=numero-cartao]').type('4242424242424242');
    cy.get('input[name=validade]').type('1228');
    cy.get('input[name=cvv]').type('123');
    cy.get('button[type=submit]').click();

    // Confirmação
    cy.contains('Pedido realizado com sucesso').should('exist');
  });

  it('Deve exibir erro ao tentar finalizar checkout com carrinho vazio', () => {
    cy.visit('/checkout');
    cy.contains('Seu carrinho está vazio').should('exist');
  });

  it('Deve exibir mensagem de erro para login inválido', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('naoexiste@onlywave.com');
    cy.get('input[name=senha]').type('senhaErrada');
    cy.get('button[type=submit]').click();
    cy.contains('Usuário ou senha inválidos').should('exist');
  });
});
