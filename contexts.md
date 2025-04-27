# Contextos Globais — OnlyWave Store

Este documento explica os principais contextos (Contexts) utilizados no front-end da OnlyWave Store, suas responsabilidades e dicas para manutenção/extensão.

---

## AuthContext (Autenticação)

**Responsabilidade:**
- Gerenciar o estado de autenticação do usuário em toda a aplicação.
- Fornecer informações do usuário logado (`currentUser`).
- Expor métodos para login, logout, cadastro e atualização de perfil.
- Controlar rotas protegidas (ex: /conta, /checkout, /admin).

**Principais métodos/valores:**
- `currentUser`: objeto do usuário autenticado (id, nome, email, role, etc)
- `login(email, senha)`: autentica o usuário
- `logout()`: encerra a sessão
- `register(dados)`: cadastra novo usuário
- `updateProfile(dados)`: atualiza dados do usuário
- `loading`: booleano indicando se está carregando estado de autenticação

**Uso:**
- Hooks customizados: `useAuth()` para acessar contexto em qualquer componente
- Exemplo:
  ```js
  const { currentUser, login, logout } = useAuth();
  ```
- Rotas protegidas usam `currentUser` para redirecionar se não autenticado

**Pontos de atenção:**
- Sempre tratar loading para evitar flicker de tela
- Garantir persistência do login (token/localStorage)
- Atualizar dados do usuário no contexto após alteração de perfil

---

## CartContext (Carrinho)

**Responsabilidade:**
- Gerenciar o estado do carrinho de compras
- Permitir adicionar, remover, atualizar quantidade e limpar carrinho
- Calcular subtotal, total, aplicar cupons/descontos
- Persistir carrinho no `localStorage` para manter entre sessões

**Principais métodos/valores:**
- `cartItems`: array de itens no carrinho
- `addToCart(produto, quantidade, tamanho)`: adiciona item
- `removeFromCart(id)`: remove item
- `updateQuantity(id, quantidade)`: altera quantidade
- `clearCart()`: esvazia carrinho
- `getTotal()`: retorna total do carrinho

**Uso:**
- Hooks customizados: `useCart()` para acessar contexto em qualquer componente
- Exemplo:
  ```js
  const { cartItems, addToCart, removeFromCart, getTotal } = useCart();
  ```

**Pontos de atenção:**
- Sempre sincronizar com localStorage após qualquer alteração
- Validar estoque antes de finalizar compra
- Atualizar carrinho ao logar/deslogar (se necessário)

---

## Dicas Gerais
- Contextos facilitam compartilhamento de estado global sem prop drilling
- Utilize hooks customizados para consumir contextos de forma limpa
- Sempre documente métodos e valores expostos
- Para novos contextos (ex: Theme, Notificações), siga o mesmo padrão

---

# 🚀 Em caso de dúvidas, consulte este arquivo ou o README.md
