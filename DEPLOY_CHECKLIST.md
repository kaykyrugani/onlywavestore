# Checklist de Deploy — OnlyWave Store

Siga este passo a passo para garantir um deploy seguro, estável e pronto para produção!

## 1. Preparação do Ambiente
- [ ] Crie/atualize o arquivo `.env.production` com as variáveis corretas
- [ ] Confirme URLs de API, chaves de pagamento e domínios (CORS liberado)
- [ ] Teste a API e integrações externas (pagamento, analytics, etc)

## 2. Build e Validação Local
- [ ] Execute `npm run build` para gerar o bundle de produção
- [ ] Rode localmente com `serve -s dist` ou similar
- [ ] Valide todas as rotas SPA (refresh em /produto/:id, /conta, /checkout)
- [ ] Teste responsividade e SEO com Lighthouse
- [ ] Verifique se não há erros ou warnings no console

## 3. Deploy
- [ ] Faça upload do build para Vercel, Netlify ou VPS
- [ ] Configure domínio customizado e HTTPS
- [ ] Ajuste variáveis de ambiente no painel do serviço
- [ ] Teste o app em ambiente real (produção/homologação)

## 4. Pós-Deploy
- [ ] Valide todos os fluxos críticos (checkout, login, carrinho, etc)
- [ ] Teste integração real com gateway de pagamento
- [ ] Confira analytics, pixel e monitoramento de erros
- [ ] Faça um QA rápido em mobile e desktop
- [ ] Compartilhe o link para homologação/validação final

---

# 🚀 Deploy seguro, OnlyWave no ar!
