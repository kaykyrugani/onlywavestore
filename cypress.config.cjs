const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ajuste para a porta correta do seu dev server
    setupNodeEvents(on, config) {
      // plugins podem ser configurados aqui, se necessário
    },
  },
});
