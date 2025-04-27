/// <reference types="cypress" />

describe('Fluxo completo de compra - OnlyWave Store', () => {
  it('Deve realizar login, adicionar produto ao carrinho e finalizar compra', () => {
    // Acessa a página inicial
    cy.visit('/');

    // Faz login
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type('usuario@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');

    // Vai para página de produtos
    cy.get('a[href="/produtos"]').click();
    cy.contains('Adicionar ao Carrinho').first().click();

    // Abre o carrinho/modal
    cy.get('a[aria-label*="sacola"]').click();
    cy.contains('Finalizar Compra').click();

    // Preenche o checkout
    cy.get('input[name="endereco"]').type('Rua Teste, 123');
    cy.get('input[name="numero"]').type('456');
    cy.get('input[name="bairro"]').type('Centro');
    cy.get('input[name="cidade"]').type('Cidade Teste');
    cy.get('input[name="cep"]').type('12345678');
    cy.get('button[type="submit"]').contains('Finalizar Pedido').click();

    // Confirma página de sucesso
    cy.url().should('include', '/sucesso');
    cy.contains('Pedido realizado com sucesso!').should('be.visible');
  });
});
