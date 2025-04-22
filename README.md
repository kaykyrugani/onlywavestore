# OnlyWave - Plataforma de E-commerce

![OnlyWave Logo](public/logo.png)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Dashboard Administrativo](#dashboard-administrativo)
- [API](#api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

OnlyWave é uma plataforma de e-commerce moderna e escalável, desenvolvida com React, TypeScript e Material UI. O projeto oferece uma experiência de compra fluida para os usuários e um painel administrativo completo para gerenciamento de produtos, pedidos e métricas de negócio.

## Funcionalidades

### 🛍️ Loja Virtual
- Catálogo de produtos com filtros e busca
- Carrinho de compras persistente
- Checkout com múltiplas formas de pagamento
- Área do cliente com histórico de pedidos
- Sistema de avaliações e comentários

### 👨‍💼 Painel Administrativo
- Dashboard com KPIs e métricas de negócio
- Gerenciamento de produtos e categorias
- Controle de pedidos e status
- Relatórios exportáveis (CSV, PDF)
- Gestão de usuários e permissões

## Tecnologias

- **Frontend**: React, TypeScript, Material UI, Recharts
- **Estilização**: CSS Modules, Styled Components
- **Gerenciamento de Estado**: Context API, React Query
- **Formulários**: React Hook Form, Yup
- **Requisições HTTP**: Axios
- **Notificações**: React Hot Toast
- **Exportação**: jsPDF, html2canvas
- **Testes**: Jest, React Testing Library

## Estrutura do Projeto

```
onlywave/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Contextos React
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Bibliotecas e configurações
│   ├── pages/              # Páginas da aplicação
│   │   ├── admin/          # Páginas do painel administrativo
│   │   ├── auth/           # Páginas de autenticação
│   │   ├── checkout/       # Páginas de checkout
│   │   └── shop/           # Páginas da loja
│   ├── services/           # Serviços de API
│   ├── styles/             # Estilos globais
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções utilitárias
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── .eslintrc.js            # Configuração ESLint
├── .prettierrc             # Configuração Prettier
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
└── vite.config.ts          # Configuração Vite
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/onlywave.git
cd onlywave
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto:
```
VITE_API_URL=https://api.onlywave.com
VITE_STRIPE_PUBLIC_KEY=sua_chave_publica_do_stripe
```

2. Configure as variáveis de ambiente para produção em `.env.production`.

## Uso

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Testes
```bash
npm run test
```

### Lint
```bash
npm run lint
```

## Dashboard Administrativo

O dashboard administrativo oferece uma visão completa do negócio com:

### 📊 KPIs Principais
- Vendas totais
- Total de pedidos
- Ticket médio
- Pedidos pendentes

### 📈 Gráficos
- Vendas por mês
- Distribuição de pedidos por status
- Produtos mais vendidos

### 🔍 Filtros
- Por período (hoje, últimos 7 dias, este mês, mês anterior)
- Por categoria
- Por método de pagamento
- Por status de pedido

### 📥 Exportação
- CSV: Dados brutos para análise em planilhas
- PDF: Relatório formatado com gráficos e métricas

## API

A API do OnlyWave segue o padrão RESTful e está documentada em `/docs/api.md`.

### Endpoints Principais
- `/products`: Gerenciamento de produtos
- `/orders`: Gerenciamento de pedidos
- `/users`: Gerenciamento de usuários
- `/dashboard`: Métricas e estatísticas

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
