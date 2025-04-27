# Diagrama de Rotas — OnlyWave Store

Este documento apresenta as principais rotas da aplicação OnlyWave Store, facilitando o entendimento do fluxo de navegação para desenvolvedores, QA e onboarding.

---

## 🌐 Rotas Públicas

- `/` — Home (vitrine, banners, destaques)
- `/produtos` — Listagem de produtos
- `/produto/:id` — Detalhe do produto
- `/carrinho` — Carrinho de compras
- `/login` — Login
- `/cadastro` — Cadastro
- `/informacoes` — Página de informações (institucional)
- `/informacoes/:tipo` — Subpáginas (FAQ, política de envio, privacidade, etc)

---

## 🔒 Rotas Protegidas (usuário autenticado)

- `/checkout` — Checkout (multi-etapas)
- `/conta` — Painel do usuário
    - `/conta/pedidos` — Histórico de pedidos
    - `/conta/perfil` — Dados do perfil

---

## 🛠️ Rotas Administrativas (admin)

- `/admin` — Dashboard admin
    - `/admin/produtos` — Gerenciar produtos
    - `/admin/pedidos` — Gerenciar pedidos
    - `/admin/usuarios` — Gerenciar usuários

---

## 🔁 Fluxo de Navegação Resumido

```mermaid
graph TD;
  Home[/] --> Produtos[/produtos]
  Produtos --> ProdutoDetalhe[/produto/:id]
  ProdutoDetalhe --> Carrinho[/carrinho]
  Carrinho --> Checkout[/checkout]
  Checkout --> Conta[/conta]
  Conta --> Pedidos[/conta/pedidos]
  Conta --> Perfil[/conta/perfil]
  Home --> Login[/login]
  Home --> Cadastro[/cadastro]
  Home --> Informacoes[/informacoes]
  Informacoes --> FAQ[/informacoes/perguntas-frequentes]
  Informacoes --> PoliticaEnvio[/informacoes/politica-de-envio]
  Informacoes --> PoliticaPrivacidade[/informacoes/politica-de-privacidade]
  Informacoes --> PoliticaReembolso[/informacoes/politica-de-reembolso]
  Informacoes --> PoliticaTroca[/informacoes/politica-de-trocas-e-devolucoes]
  Informacoes --> TermosServico[/informacoes/termos-de-servico]
  Informacoes --> TermosLegais[/informacoes/termos-legais]
  Informacoes --> PoliticaCookies[/informacoes/politica-de-cookies]
  Home --> Admin[/admin]
  Admin --> AdminProdutos[/admin/produtos]
  Admin --> AdminPedidos[/admin/pedidos]
  Admin --> AdminUsuarios[/admin/usuarios]
```

---

## Observações
- Rotas protegidas exigem autenticação; rotas admin exigem permissão de admin.
- Redirecionamentos automáticos para `/login` se não autenticado.
- Rotas inválidas redirecionam para `/` (Home).

---

# 🚀 Consulte este arquivo para referência rápida de navegação!
