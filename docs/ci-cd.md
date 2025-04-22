# Configuração de CI/CD - OnlyWave

Este documento descreve o pipeline de Integração Contínua e Entrega Contínua (CI/CD) configurado para o projeto OnlyWave.

## Visão Geral

O pipeline CI/CD do OnlyWave utiliza GitHub Actions para automatizar o processo de build, teste e deploy da aplicação. O pipeline está configurado para executar as seguintes etapas:

1. **Lint**: Verificação de qualidade de código
2. **Testes**: Execução de testes automatizados
3. **Build**: Compilação da aplicação
4. **Deploy**: Implantação em ambientes de desenvolvimento, homologação e produção

## Estrutura do Pipeline

```
.github/
└── workflows/
    ├── ci.yml           # Pipeline de integração contínua
    ├── cd-dev.yml       # Pipeline de entrega contínua - ambiente de desenvolvimento
    ├── cd-staging.yml   # Pipeline de entrega contínua - ambiente de homologação
    └── cd-prod.yml      # Pipeline de entrega contínua - ambiente de produção
```

## Pipeline de Integração Contínua (CI)

O arquivo `ci.yml` define o pipeline de integração contínua que é executado a cada push para qualquer branch.

```yaml
name: CI

on:
  push:
    branches: [ main, develop, feature/*, bugfix/* ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
```

## Pipeline de Entrega Contínua (CD)

### Ambiente de Desenvolvimento

O arquivo `cd-dev.yml` define o pipeline de entrega contínua para o ambiente de desenvolvimento, que é executado a cada push para a branch `develop`.

```yaml
name: CD - Development

on:
  push:
    branches: [ develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: ci
    environment: development
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      - name: Setup AWS CLI
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://dev.onlywave.com --delete
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_DEV }} --paths "/*"
```

### Ambiente de Homologação

O arquivo `cd-staging.yml` define o pipeline de entrega contínua para o ambiente de homologação, que é executado quando uma pull request para a branch `main` é mesclada.

```yaml
name: CD - Staging

on:
  pull_request:
    types: [closed]
    branches: [ main ]

jobs:
  deploy:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    needs: ci
    environment: staging
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      - name: Setup AWS CLI
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://staging.onlywave.com --delete
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_STAGING }} --paths "/*"
```

### Ambiente de Produção

O arquivo `cd-prod.yml` define o pipeline de entrega contínua para o ambiente de produção, que é executado quando uma tag é criada.

```yaml
name: CD - Production

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: ci
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      - name: Setup AWS CLI
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://onlywave.com --delete
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_PROD }} --paths "/*"
```

## Configuração de Ambientes

### Variáveis de Ambiente

Cada ambiente possui suas próprias variáveis de ambiente, configuradas no GitHub:

- **Development**: Configurado no ambiente `development`
- **Staging**: Configurado no ambiente `staging`
- **Production**: Configurado no ambiente `production`

### Segredos

Os seguintes segredos são utilizados nos pipelines:

- `AWS_ACCESS_KEY_ID`: Chave de acesso da AWS
- `AWS_SECRET_ACCESS_KEY`: Chave secreta da AWS
- `CLOUDFRONT_DISTRIBUTION_ID_DEV`: ID da distribuição CloudFront para o ambiente de desenvolvimento
- `CLOUDFRONT_DISTRIBUTION_ID_STAGING`: ID da distribuição CloudFront para o ambiente de homologação
- `CLOUDFRONT_DISTRIBUTION_ID_PROD`: ID da distribuição CloudFront para o ambiente de produção

## Fluxo de Trabalho

1. **Desenvolvimento**:
   - Crie uma branch a partir de `develop` para desenvolver uma nova funcionalidade
   - Faça commits e pushes para a branch
   - Crie uma pull request para `develop`
   - Após a revisão e aprovação, mescle a pull request

2. **Homologação**:
   - Crie uma pull request de `develop` para `main`
   - Após a revisão e aprovação, mescle a pull request
   - O pipeline CD-Staging será executado automaticamente

3. **Produção**:
   - Crie uma tag a partir da branch `main` (ex: `v1.0.0`)
   - O pipeline CD-Production será executado automaticamente

## Monitoramento e Alertas

- **GitHub Actions**: Monitoramento do status dos pipelines
- **AWS CloudWatch**: Monitoramento de logs e métricas
- **Slack**: Notificações de falhas nos pipelines

## Rollback

Em caso de falha no deploy, é possível realizar um rollback:

1. Identifique a última versão estável
2. Crie uma tag a partir dessa versão (ex: `v1.0.0-rollback`)
3. O pipeline CD-Production será executado automaticamente

## Considerações de Segurança

- Todas as credenciais são armazenadas como segredos no GitHub
- Acesso aos ambientes é controlado por permissões no GitHub
- Todas as requisições são feitas via HTTPS
- Os artefatos de build são armazenados em buckets S3 com acesso restrito 