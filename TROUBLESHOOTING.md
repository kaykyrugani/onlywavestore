# Guia Rápido de Troubleshooting — OnlyWave Store

Este guia ajuda a identificar e resolver rapidamente problemas comuns após o deploy do front-end OnlyWave.

---

## 1. App não carrega ou tela branca
- Verifique se o build foi feito com sucesso (`npm run build`)
- Confira se o caminho do build está correto no servidor (ex: `/dist`, `/build`)
- Certifique-se de que as variáveis de ambiente estão configuradas corretamente
- Veja o console do navegador para mensagens de erro
- Teste abrir a página diretamente em `/` e em rotas internas (ex: `/produto/1`)

## 2. Erros de CORS ou API
- Confirme se `REACT_APP_API_URL` está correto e acessível
- Verifique se o domínio de produção está liberado no backend (CORS)
- Teste chamada manual à API pelo Postman/cURL

## 3. Problemas com pagamento
- Cheque as chaves de API do Stripe (ou outro gateway)
- Veja logs de erro no painel do gateway
- Teste em ambiente de sandbox/homologação

## 4. Carrinho não persiste
- Limpe o cache/localStorage e teste novamente
- Verifique se o contexto do carrinho está sincronizando corretamente
- Confira se há erros no console ao adicionar/remover itens

## 5. Falhas de login/autenticação
- Veja se o backend está online e respondendo
- Confira as rotas e payloads das requisições de login/cadastro
- Limpe cookies/localStorage e tente novamente

## 6. SEO e imagens
- Rode o Lighthouse e confira recomendações
- Certifique-se de que títulos, descrições e imagens estão dinâmicas

## 7. Outros
- Teste em outro navegador/dispositivo
- Confira logs do servidor (Vercel/Netlify/VPS)
- Consulte o arquivo QA_CHECKLIST.md para validações adicionais

---

# 🚑 Persistindo o problema?
- Compartilhe prints, logs e passos para reproduzir
- Consulte a documentação da stack (React, Stripe, serviço de deploy)
- Peça suporte ao time ou comunidade
