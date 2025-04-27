module.exports = (on, config) => {
  // `on` é usado para registrar eventos do Cypress
  // `config` é o objeto de configuração do Cypress

  // Configuração do plugin de cobertura de código
  require('@cypress/code-coverage/task')(on, config);

  // Configuração do plugin de visualização
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome' || browser.name === 'chromium') {
      launchOptions.args.push('--disable-dev-shm-usage');
      return launchOptions;
    }
    return launchOptions;
  });

  // Configuração do plugin de screenshot
  on('after:screenshot', (details) => {
    console.log('Screenshot taken:', details.path);
  });

  return config;
}; 