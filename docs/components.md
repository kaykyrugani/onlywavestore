divisao: '12x de <span>24,99</span> sem juros'
};

<ProductCard product={product} />
```

## Pagination

Um componente para navegação entre páginas.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `currentPage` | Number | - | Página atual |
| `totalPages` | Number | - | Número total de páginas |
| `onPageChange` | Function | - | Função chamada quando a página é alterada |
| `showDots` | Boolean | true | Se deve mostrar os indicadores visuais (bolinhas) |

### Exemplo de Uso

```jsx
import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination';

function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## SEO

Um componente para otimização de SEO.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | String | - | Título da página |
| `description` | String | - | Descrição da página |
| `keywords` | String | '' | Palavras-chave para SEO |
| `canonicalUrl` | String | - | URL canônica da página |
| `ogImage` | String | '/og-image.jpg' | Imagem para compartilhamento em redes sociais |
| `ogType` | String | 'website' | Tipo de conteúdo para Open Graph |

### Exemplo de Uso

```jsx
import SEO from '../components/SEO/SEO';

<SEO
  title="Página Inicial"
  description="OnlyWave Store - Sua moda, nossa onda. Encontre as melhores roupas, tênis e acessórios."
  keywords="moda, tênis, roupas, acessórios, loja online"
  canonicalUrl="https://onlywavestore.com"
/>
```

## Layout

Um componente de layout que inclui o cabeçalho e o rodapé.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | Node | - | Conteúdo principal da página |
| `seo` | Node | - | Componente SEO para a página |

### Exemplo de Uso

```jsx
import Layout from '../components/Layout/Layout';
import SEO from '../components/SEO/SEO';

function HomePage() {
  return (
    <Layout
      seo={
        <SEO
          title="Página Inicial"
          description="OnlyWave Store - Sua moda, nossa onda."
        />
      }
    >
      <h1>Conteúdo da Página Inicial</h1>
      {/* Outros componentes da página */}
    </Layout>
  );
}
```

## ProductGrid

Um componente para exibir uma grade de produtos com paginação.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `products` | Array | - | Array de objetos de produtos |
| `currentPage` | Number | - | Página atual |
| `totalPages` | Number | - | Número total de páginas |
| `onPageChange` | Function | - | Função chamada quando a página é alterada |

### Exemplo de Uso

```jsx
import { useState } from 'react';
import ProductGrid from '../components/ProductGrid/ProductGrid';

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = [...]; // Array de produtos
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // Obter produtos da página atual
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <ProductGrid
      products={currentProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```
```

## 3. Guia de Estilo

```markdown:docs/style-guide.md
# Guia de Estilo OnlyWave Store

Este guia de estilo define as diretrizes visuais e de código para manter a consistência em todo o projeto OnlyWave Store.

## Cores

### Cores Primárias

- **Cor Primária**: `#4EBABA` - Usado para elementos principais, botões, links e destaques
- **Contraste Primário**: `#17F1F1` - Usado para estados hover e elementos interativos
- **Primária Escura**: `#0F2626` - Usado para textos sobre fundos claros e elementos de destaque

### Cores Neutras

- **Branco**: `#FFFFFF` - Fundo principal e textos sobre fundos escuros
- **Preto**: `#000000` - Textos principais e elementos de destaque
- **Cinza**: `#838585` - Textos secundários, bordas e elementos desabilitados

### Cores Análogas

- **Azul Análogo**: `#4E84BA` - Usado para categorias e elementos secundários
- **Verde Análogo**: `#4EBA84` - Usado para marcas e elementos terciários

### Cores de Modo Claro

- **Fundo Light**: `#FFFFFF` - Fundo principal no modo claro
- **Fundo Texto Light**: `#7BC9CC` - Fundo para textos no modo claro
- **Contraste Light**: `#3B9696` - Elementos de contraste no modo claro
- **Cor Clara Light**: `#D3ECEE` - Elementos sutis no modo claro
- **Cor Footer Light**: `#f0f7f4` - Fundo do rodapé no modo claro

### Cores de Modo Escuro

- **Fundo Dark**: `#091516` - Fundo principal no modo escuro
- **Fundo Texto Dark**: `#42A5A9` - Fundo para textos no modo escuro
- **Contraste Dark**: `#1E4B4D` - Elementos de contraste no modo escuro
- **Cor Clara Dark**: `#7BCACC` - Elementos sutis no modo escuro

## Tipografia

### Fontes

- **Fonte Principal**: Inter, sans-serif
- **Fonte Secundária**: Roboto, sans-serif (para elementos específicos)

### Tamanhos de Fonte

- **Extra Grande**: 32px - Títulos principais
- **Grande**: 24px - Subtítulos e cabeçalhos de seção
- **Médio**: 18px - Textos de destaque e botões
- **Normal**: 16px - Texto principal
- **Pequeno**: 14px - Textos secundários e legendas
- **Extra Pequeno**: 12px - Notas de rodapé e informações adicionais

### Pesos de Fonte

- **Regular**: 400 - Texto principal
- **Medium**: 500 - Subtítulos e elementos de destaque
- **Bold**: 600 - Títulos e botões
- **Extra Bold**: 700 - Elementos de grande destaque

## Espaçamento

### Unidades de Espaçamento

- **4px**: Espaçamento mínimo
- **8px**: Espaçamento pequeno
- **16px**: Espaçamento médio
- **24px**: Espaçamento grande
- **32px**: Espaçamento extra grande
- **48px**: Espaçamento entre seções
- **64px**: Espaçamento entre blocos principais

### Margens e Paddings

- Use múltiplos de 8px para manter consistência
- Mantenha espaçamento vertical consistente entre elementos relacionados
- Use padding para criar espaço dentro de componentes
- Use margin para criar espaço entre componentes

## Componentes

### Botões

- **Primário**: Fundo `#4EBABA`, texto branco, border-radius 4px
- **Secundário**: Fundo branco, borda `#4EBABA`, texto `#4EBABA`, border-radius 4px
- **Outline**: Transparente com borda `#4EBABA`, texto `#4EBABA`, border-radius 4px
- **Texto**: Sem fundo nem borda, texto `#4EBABA`

### Cards

- Fundo branco
- Border-radius 8px
- Sombra suave: `0 2px 8px rgba(0, 0, 0, 0.1)`
- Padding interno de 16px

### Inputs

- Border-radius 4px
- Borda `#838585`
- Altura de 44px
- Padding horizontal de 12px
- Foco: borda `#4EBABA`

## Animações

### Transições

- **Rápida**: 0.2s - Para mudanças de estado simples (hover, focus)
- **Média**: 0.3s - Para transições de componentes
- **Lenta**: 0.5s - Para animações mais complexas
- **Muito Lenta**: 1s ou mais - Para animações de entrada/saída

### Curvas de Easing

- **Padrão**: ease-in-out
- **Entrada**: ease-out
- **Saída**: ease-in
- **Bounce**: cubic-bezier(0.175, 0.885, 0.32, 1.275)

## Responsividade

### Breakpoints

- **Mobile**: < 480px
- **Tablet Pequeno**: 480px - 768px
- **Tablet Grande**: 768px - 1024px
- **Desktop Pequeno**: 1024px - 1200px
- **Desktop Grande**: > 1200px

### Grid

- Sistema de grid flexível com 12 colunas
- Gutter (espaçamento entre colunas) de 20px
- Container máximo de 1200px

## Convenções de Código

### CSS

- Use CSS Modules para estilos específicos de componentes
- Use variáveis CSS para cores, fontes e outros valores reutilizáveis
- Siga a metodologia BEM para nomenclatura de classes quando não usar CSS Modules
- Organize as propriedades em ordem alfabética

### JavaScript/React

- Use camelCase para variáveis e funções
- Use PascalCase para componentes e classes
- Use destructuring para props
- Prefira funções de componente com hooks em vez de componentes de classe
- Use propTypes ou TypeScript para tipagem de props
```

# Etapa 9: Otimização de Desempenho

Vamos implementar algumas otimizações de desempenho para melhorar a experiência do usuário.

## 1. Implementar Lazy Loading para Componentes e Rotas

Atualize o arquivo de rotas para usar lazy loading:

```javascript:src\routes\index.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

// Lazy loading das páginas
const Home = lazy(() => import('../pages/home/homeindex'));
const ProductsPage = lazy(() => import('../pages/produtos'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos/:categoria" element={<ProductsPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
```

## 2. Criar um Componente LoadingSpinner

```javascript:src\components\LoadingSpinner\LoadingSpinner.jsx
import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingSpinner;
```

```css:src\components\LoadingSpinner\LoadingSpinner.module.css
.spinnerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(78, 186, 186, 0.3);
  border-radius: 50%;
  border-top-color: var(--cor-primaria);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinnerContainer p {
  color: var(--cor-primaria);
  font-size: 16px;
  font-weight: 500;
}
```

## 3. Implementar Otimização de Imagens

Crie um componente de imagem otimizada:

```javascript:src\components\OptimizedImage\OptimizedImage.jsx
import React, { useState, useEffect } from 'react';
import styles from './OptimizedImage.module.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  lazy = true, 
  placeholder = 'https://via.placeholder.com/200x200?text=Carregando...',
  className = '',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(lazy ? placeholder : src);
  const [imageLoaded, setImageLoaded] = useState(!lazy);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (lazy) {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      
      img.onerror = () => {
        setError(true);
        setImageSrc(placeholder);
      };
    }
  }, [src, lazy, placeholder]);

  return (
    <img 
      src={error ? placeholder : imageSrc} 
      alt={alt} 
      width={width} 
      height={height}
      loading={lazy ? "lazy" : "eager"}
      className={`${styles.image} ${!imageLoaded ? styles.loading : ''} ${className}`}
      onError={() => {
        setError(true);
        setImageSrc(placeholder);
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
```

````css:src\components\OptimizedImage\OptimizedImage.module.css
.image {
  transition: opacity 0
