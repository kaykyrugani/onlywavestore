/// <reference types="cypress" />

describe('Fluxo de favoritos - OnlyWave Store', () => {
  it('Deve adicionar e remover produtos dos favoritos e persistir estado', () => {
    // Acessa a página inicial
    cy.visit('/');

    // Faz login
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type('usuario@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');

    // Adiciona primeiro produto aos favoritos
    cy.get('[aria-label*="favorito"]').first().click();
    cy.get('[aria-label*="favorito"]').first().should('have.attr', 'aria-pressed', 'true');

    // Vai para página de favoritos
    cy.get('a[href="/favoritos"]').click();
    cy.contains('Meus Favoritos').should('be.visible');
    cy.get('.ProductCard').should('have.length.at.least', 1);

    // Remove dos favoritos
    cy.get('[aria-label*="remover dos favoritos"]').first().click();
    cy.contains('Você ainda não tem favoritos').should('be.visible');

    // Persiste ao recarregar
    cy.reload();
    cy.contains('Você ainda não tem favoritos').should('be.visible');
  });
});
