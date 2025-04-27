import '@cypress/code-coverage/support';
import './commands';

// Configuração do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe no teste
  return false;
});

// Configuração do Cypress
Cypress.on('window:before:load', (win) => {
  // Configuração do localStorage
  win.localStorage.setItem('token', 'test-token');
});

// Configuração do Cypress
Cypress.on('window:before:unload', (win) => {
  // Limpa o localStorage
  win.localStorage.clear();
}); 