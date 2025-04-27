/// <reference types="cypress" />

describe('Fluxo de cadastro de usuário - OnlyWave Store', () => {
  it('Deve cadastrar novo usuário, redirecionar e validar contexto', () => {
    // Acessa a página de cadastro
    cy.visit('/cadastro');

    // Preenche formulário de cadastro
    cy.get('input[name="nome"]').type('Novo Usuário');
    cy.get('input[name="email"]').type('novousuario@teste.com');
    cy.get('input[name="password"]').type('senhaNova123');
    cy.get('input[name="confirmPassword"]').type('senhaNova123');
    cy.get('button[type="submit"]').contains('Cadastrar').click();

    // Espera redirecionamento automático (ex: para /login ou /conta)
    cy.url().should('not.include', '/cadastro');

    // Valida mensagem de sucesso ou contexto logado
    cy.contains(/bem[- ]vindo|cadastro realizado|sucesso/i).should('be.visible');
  });
});
