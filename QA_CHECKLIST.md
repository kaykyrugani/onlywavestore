# Checklist QA Final — OnlyWave Store

Use este checklist para validar o front-end antes da entrega/homologação. Marque cada item conforme for testando!

## Fluxos Críticos
- [ ] Cadastro de usuário
- [ ] Login/logout
- [ ] Recuperação de senha
- [ ] Listagem de produtos
- [ ] Detalhe do produto
- [ ] Adicionar/remover do carrinho
- [ ] Persistência do carrinho entre sessões
- [ ] Checkout completo (endereço, entrega, pagamento)
- [ ] Validação de CEP e cálculo de frete
- [ ] Integração com gateway de pagamento
- [ ] Histórico de pedidos na conta
- [ ] Atualização de perfil
- [ ] Redirecionamento de rotas protegidas (login obrigatório)
- [ ] Mensagens de erro e loading em todas as ações

## Experiência do Usuário
- [ ] Responsividade em todos os dispositivos
- [ ] Navegação por teclado e acessibilidade básica
- [ ] Feedback visual (toasts, loaders)
- [ ] Textos e mensagens revisados
- [ ] Imagens carregando corretamente

## Testes Técnicos
- [ ] Teste cross-browser (Chrome, Firefox, Edge, Safari)
- [ ] Teste em mobile real (Android/iOS)
- [ ] Sem erros/warnings no console
- [ ] SEO básico (título, descrição, canonical)
- [ ] Build de produção funcionando (`npm run build` + `serve -s dist`)

## Observações
- Simule falhas de conexão, produtos sem estoque, login inválido.
- Teste links externos e botões em diferentes breakpoints.
- Valide integração real com API e pagamentos.

---

# 🚦 Pronto para homologação? Marque todos os itens acima!
