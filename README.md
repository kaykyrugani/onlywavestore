# OnlyWave Store

Uma loja virtual moderna e responsiva construída com React e Vite.

## 🚀 Tecnologias

- React 18
- Vite
- React Router DOM
- SWR para gerenciamento de estado e cache
- CSS Modules para estilização
- PropTypes para validação de tipos

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/onlywave-store.git
cd onlywave-store
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
src/
  ├── components/
  │   ├── layout/
  │   │   ├── Header/
  │   │   ├── Footer/
  │   │   └── Layout/
  │   └── ui/
  │       ├── Button/
  │       ├── Input/
  │       ├── Image/
  │       ├── Modal/
  │       ├── ProductCard/
  │       └── ProductGrid/
  ├── hooks/
  │   ├── useApi.js
  │   ├── useCache.js
  │   └── useCart.js
  ├── styles/
  │   ├── variables.css
  │   └── global.css
  └── App.jsx
```

## 🎨 Componentes

### UI Components

- **Button**: Botão reutilizável com diferentes variantes e estados
- **Input**: Campo de entrada com validação e feedback visual
- **Image**: Componente de imagem otimizado com lazy loading
- **Modal**: Modal reutilizável para exibir conteúdo
- **ProductCard**: Card de produto com informações e ações
- **ProductGrid**: Grid responsivo para exibir produtos

### Layout Components

- **Header**: Cabeçalho com navegação e carrinho
- **Footer**: Rodapé com links e informações
- **Layout**: Layout principal que envolve as páginas

## 🛠️ Hooks

- **useApi**: Hook para fazer requisições à API
- **useCache**: Hook para gerenciar cache de dados
- **useCart**: Hook para gerenciar o carrinho de compras

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- Desktop: 1200px e acima
- Tablet: 900px até 1199px
- Mobile: até 899px

## 🚀 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm run lint`: Executa o linter

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
