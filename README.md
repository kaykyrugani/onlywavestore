# OnlyWave

Frontend do projeto OnlyWave, uma plataforma de e-commerce para venda de produtos de surf.

## Tecnologias

- React
- React Router
- React Hook Form
- Framer Motion
- Styled Components
- Axios
- React Query
- React Toastify
- React Icons
- React Helmet
- React Loading Skeleton
- React Lazy Load Image Component
- React Slick
- React Modal
- React Select
- React Date Picker
- React Currency Input
- React Input Mask
- React Number Format
- React Credit Cards
- React Stripe Elements
- React Google Analytics
- React Sentry
- React Testing Library
- Jest
- Cypress
- ESLint
- Prettier
- Husky
- Lint Staged
- Commitizen
- Conventional Commits
- Docker
- Docker Compose
- Nginx

## Requisitos

- Node.js 18.x
- npm 8.x
- Docker 20.x
- Docker Compose 2.x

## Instalação

```bash
# Clone o repositório
git clone https://github.com/onlywave/frontend.git

# Entre no diretório do projeto
cd frontend

# Instale as dependências
npm install

# Crie o arquivo .env
cp .env.example .env

# Configure as variáveis de ambiente
vim .env

# Inicie o projeto em desenvolvimento
npm run dev

# Inicie o projeto em produção
npm run build
npm run start

# Inicie o projeto com Docker
docker-compose up -d
```

## Scripts

- `npm run dev` - Inicia o projeto em desenvolvimento
- `npm run build` - Gera o build do projeto
- `npm run start` - Inicia o projeto em produção
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Executa os testes e gera o relatório de cobertura
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Executa o linter e corrige os erros
- `npm run format` - Executa o prettier
- `npm run format:check` - Verifica se o código está formatado
- `npm run prepare` - Instala o husky
- `npm run commit` - Executa o commitizen

## Estrutura do Projeto

```
src/
  ├── assets/          # Arquivos estáticos
  ├── components/      # Componentes reutilizáveis
  ├── config/          # Configurações
  ├── contexts/        # Contextos
  ├── hooks/           # Hooks personalizados
  ├── pages/           # Páginas
  ├── services/        # Serviços
  ├── styles/          # Estilos globais
  ├── utils/           # Utilitários
  ├── App.jsx          # Componente principal
  └── index.jsx        # Ponto de entrada
```

## Principais Funcionalidades

- Carrinho de compras com modal interativo e feedback acessível
- Cadastro, login e autenticação de usuários
- Página de favoritos com persistência e navegação
- Checkout completo com validação e página de sucesso
- SEO dinâmico em todas as páginas principais e secundárias
- Acessibilidade (aria-labels, roles, contraste, navegação por teclado)
- Responsividade total (mobile-first, CSS Grid, Flexbox, clamp)
- Testes automatizados (unitários e E2E com Cypress)
- Otimizações de performance (lazy loading, compressão Brotli)

## Scripts

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Testes unitários
npm run test

# Testes E2E (Cypress)
npx cypress open

# Lint e formatação
npm run lint
npm run format
```

## Testes E2E

- Os principais fluxos (compra, cadastro, favoritos) estão cobertos em `cypress/e2e/`
- Exemplos: `checkout-flow.cy.js`, `favoritos-flow.cy.js`, `cadastro-flow.cy.js`

## Acessibilidade

- Uso extensivo de `aria-label`, roles semânticos, foco visível e contraste
- Checklist Lighthouse > 90 para A11y
- Navegação por teclado garantida

## SEO

- Todas as páginas usam `<SEO>` com Helmet
- Meta tags, canonical, og:image e Schema.org (OrderSuccess)

## Performance

- Lazy loading de rotas principais
- Code splitting configurado
- Compressão Brotli via vite-plugin-compression

## Documentação complementar

- `docs/contextos.md`: detalhes de AuthContext, CartContext, CarrinhoContext
- `components/README.md`: guia rápido dos principais componentes
- `fluxo-app.png`: fluxograma do fluxo Home → Produto → Checkout

## Variáveis de ambiente

- `.env.example` disponível com todas as variáveis necessárias
- Configure URLs de API, chaves de serviços e ambiente de produção

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Email: contato@onlywave.com.br
- Site: https://onlywave.com.br
- GitHub: https://github.com/onlywave

---

# 📦 Checklist Final de Entrega — OnlyWave Frontend

## Situação Atual
- Todas as telas prontas e 100% responsivas
- UI consistente, polida e mobile-first
- Estrutura modular com Context API, hooks e rotas protegidas

## Etapas Restantes

### 🔄 Funcionalidades & Integrações
- [ ] Integração real com gateway de pagamento
- [ ] Validação e fallback de CEP/frete no checkout
- [ ] Persistência e atualização do carrinho no localStorage/context
- [ ] Testar login/cadastro, redirecionamentos e mensagens de erro
- [ ] Recuperação de senha (fluxo completo)
- [ ] Atualização de perfil e histórico de pedidos na conta

### 🧪 Testes & QA
- [ ] Unitários (Jest + RTL): CartModal, ProdutoInfo, CheckoutForm
- [ ] Cypress E2E: login → produto → carrinho → checkout → pedido
- [ ] Testes manuais: cross-browser, mobile real, edge cases

### 📄 Documentação
- [ ] README.md com instruções, build, deploy e variáveis .env
- [ ] contexts.md explicando AuthContext, CartContext
- [ ] Diagrama de rotas principais
- [ ] Comentários em trechos críticos do código

### 🚀 Build Final & Deploy
- [ ] `.env.production` com variáveis reais
- [ ] `npm run build` e validação local
- [ ] SEO com Lighthouse
- [ ] Deploy (Vercel/Netlify/VPS)
- [ ] App sem warnings/erros no console

## SPRINT SUGERIDA (4 dias)
| Dia | Foco                          | Tarefas-chave                                                 |
|-----|-------------------------------|---------------------------------------------------------------|
| 1   | Integrações e feedbacks UX    | Carrinho, checkout, login, loading, erros                     |
| 2   | Testes E2E + unitários        | Cypress (checkout, login), Jest (componentes principais)      |
| 3   | Documentação + QA manual      | README, contexts, rotas, cross-browser testing                |
| 4   | Build final + deploy + revisão| Lighthouse, `.env.production`, deploy em ambiente real        |

---

## Como contribuir/testar
- Siga o checklist acima para garantir a entrega profissional
- Priorize testes em flows críticos (checkout, login, carrinho)
- Documente qualquer ajuste importante
- Dúvidas? Consulte os arquivos de contexto e o README atualizado

---

# 🚀 Bora lançar a OnlyWave!
