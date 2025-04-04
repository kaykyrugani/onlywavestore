# Estrutura do Projeto OnlyWave Store

## Visão Geral

O projeto OnlyWave Store é uma aplicação de e-commerce desenvolvida com React. A estrutura do projeto foi organizada para promover a modularidade, reutilização de código e facilidade de manutenção.

## Estrutura de Diretórios

```
onlywavestore/
├── public/                  # Arquivos públicos estáticos
├── src/                     # Código fonte da aplicação
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button/          # Componente de botão
│   │   ├── Cart/            # Componentes relacionados ao carrinho
│   │   ├── Container/       # Componente de container
│   │   ├── ErrorBoundary/   # Componente para tratamento de erros
│   │   ├── Footer/          # Componente de rodapé
│   │   ├── Header/          # Componente de cabeçalho
│   │   ├── Hero/            # Componente de banner principal
│   │   ├── Layout/          # Componente de layout
│   │   ├── Modal/           # Componente de modal
│   │   ├── Pagination/      # Componente de paginação
│   │   ├── ProductCard/     # Componente de card de produto
│   │   ├── ProductGrid/     # Componente de grid de produtos
│   │   ├── ProdutosCaroussel/ # Componente de carrossel de produtos
│   │   ├── SearchBar/       # Componente de barra de pesquisa
│   │   └── SEO/             # Componente para otimização de SEO
│   ├── contexts/            # Contextos da aplicação
│   │   └── CartContext.jsx  # Contexto do carrinho de compras
│   ├── hooks/               # Hooks personalizados
│   ├── pages/               # Páginas da aplicação
│   │   ├── home/            # Página inicial
│   │   └── produtos/        # Página de produtos
│   ├── routes/              # Configuração de rotas
│   ├── services/            # Serviços (API, etc.)
│   ├── styles/              # Estilos globais
│   ├── utils/               # Funções utilitárias
│   ├── App.jsx              # Componente principal da aplicação
│   ├── global.css           # Estilos globais
│   └── main.jsx             # Ponto de entrada da aplicação
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts
├── README.md                # Documentação principal
└── vite.config.js           # Configuração do Vite
```

## Principais Módulos

### Components

Contém todos os componentes reutilizáveis da aplicação, organizados em pastas individuais. Cada pasta de componente contém:
- O arquivo principal do componente (JSX)
- Arquivo de estilos (CSS/CSS Modules)
- Arquivo de testes
- Documentação específica do componente (quando necessário)

### Contexts

Contém os contextos da aplicação, utilizando a Context API do React para gerenciamento de estado global.

### Pages

Contém as páginas da aplicação, que são compostas por componentes menores.

### Routes

Contém a configuração de rotas da aplicação, utilizando o React Router.

### Services

Contém serviços para comunicação com APIs externas e outras funcionalidades relacionadas.

### Utils

Contém funções utilitárias que podem ser usadas em diferentes partes da aplicação.

## Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: ProductCard)
- **Arquivos de componentes**: PascalCase (ex: ProductCard.jsx)
- **Arquivos de estilos**: PascalCase.module.css (ex: ProductCard.module.css)
- **Contextos**: PascalCase (ex: CartContext)
- **Hooks**: camelCase com prefixo "use" (ex: useCart)
- **Funções utilitárias**: camelCase (ex: formatPrice)
```

## 2. Documentação de Componentes Reutilizáveis

```markdown:docs/components.md
# Componentes Reutilizáveis

Este documento descreve os principais componentes reutilizáveis disponíveis no projeto OnlyWave Store.

## Button

Um componente de botão flexível e personalizável.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | Node | - | Conteúdo do botão |
| `variant` | String | 'primary' | Variante do botão ('primary', 'secondary', 'outline', 'text') |
| `size` | String | 'medium' | Tamanho do botão ('small', 'medium', 'large') |
| `fullWidth` | Boolean | false | Se o botão deve ocupar toda a largura disponível |
| `disabled` | Boolean | false | Se o botão está desabilitado |
| `onClick` | Function | - | Função chamada quando o botão é clicado |
| `type` | String | 'button' | Tipo do botão ('button', 'submit', 'reset') |
| `className` | String | '' | Classes CSS adicionais |

### Exemplo de Uso

```jsx
import Button from '../components/Button/Button';

// Botão primário (padrão)
<Button onClick={handleClick}>Clique Aqui</Button>

// Botão secundário
<Button variant="secondary" size="large">Botão Grande</Button>

// Botão de contorno
<Button variant="outline" disabled={isLoading}>
  {isLoading ? 'Carregando...' : 'Salvar'}
</Button>

// Botão de texto
<Button variant="text">Saiba Mais</Button>

// Botão de largura total
<Button fullWidth>Finalizar Compra</Button>
```

## Container

Um componente para centralizar e limitar a largura do conteúdo.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | Node | - | Conteúdo do container |
| `className` | String | '' | Classes CSS adicionais |
| `fluid` | Boolean | false | Se o container deve ter largura máxima de 100% |

### Exemplo de Uso

```jsx
import Container from '../components/Container/Container';

// Container padrão (largura máxima de 1200px)
<Container>
  <h1>Conteúdo centralizado</h1>
  <p>Este conteúdo está centralizado e com largura limitada.</p>
</Container>

// Container fluido (largura máxima de 100%)
<Container fluid>
  <div>Conteúdo de largura total</div>
</Container>
```

## Modal

Um componente de modal reutilizável.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `isOpen` | Boolean | - | Se o modal está aberto |
| `onClose` | Function | - | Função chamada quando o modal é fechado |
| `title` | String | - | Título do modal |
| `children` | Node | - | Conteúdo do modal |
| `className` | String | '' | Classes CSS adicionais para o modal |
| `overlayClassName` | String | '' | Classes CSS adicionais para o overlay |
| `closeTimeoutMS` | Number | 300 | Tempo de animação em milissegundos |

### Exemplo de Uso

```jsx
import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal}>Abrir Modal</Button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Exemplo de Modal"
      >
        <p>Este é um exemplo de conteúdo do modal.</p>
        <Button onClick={closeModal}>Fechar</Button>
      </Modal>
    </>
  );
}
```

## ProductCard

Um componente para exibir informações de um produto.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `product` | Object | - | Objeto com informações do produto |

### Exemplo de Uso

````jsx
import ProductCard from '../components/ProductCard/ProductCard';

const product = {
  id: 1,
  nome: 'Tênis Esportivo',
  imagem: 'url_da_imagem',
  preco: 299.99,
  promocao: true,
  avaliacoes: 4.5,
  divisao: '12x de
