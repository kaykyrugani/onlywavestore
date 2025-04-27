describe('Autenticação', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve fazer login com sucesso', () => {
    cy.login('test@test.com', '123456');
    cy.get('[data-testid="user-menu"]').should('exist');
  });

  it('Deve mostrar erro ao fazer login com credenciais inválidas', () => {
    cy.login('test@test.com', '1234567');
    cy.get('[data-testid="login-error-message"]').should('exist');
  });

  it('Deve fazer logout com sucesso', () => {
    cy.login('test@test.com', '123456');
    cy.logout();
    cy.get('[data-testid="login-button"]').should('exist');
  });

  it('Deve manter o usuário logado após atualizar a página', () => {
    cy.login('test@test.com', '123456');
    cy.reload();
    cy.get('[data-testid="user-menu"]').should('exist');
  });

  it('Deve redirecionar para a página de login ao tentar acessar página protegida sem estar logado', () => {
    cy.visit('/checkout');
    cy.url().should('include', '/login');
  });

  it('Deve redirecionar para a página inicial após fazer login', () => {
    cy.visit('/login');
    cy.login('test@test.com', '123456');
    cy.url().should('not.include', '/login');
  });

  it('Deve redirecionar para a página inicial após fazer logout', () => {
    cy.login('test@test.com', '123456');
    cy.logout();
 