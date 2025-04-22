# Manual do Administrador - OnlyWave

## Índice

1. [Introdução](#introdução)
2. [Acesso ao Painel](#acesso-ao-painel)
3. [Dashboard](#dashboard)
4. [Gerenciamento de Produtos](#gerenciamento-de-produtos)
5. [Gerenciamento de Pedidos](#gerenciamento-de-pedidos)
6. [Gerenciamento de Usuários](#gerenciamento-de-usuários)
7. [Relatórios e Exportações](#relatórios-e-exportações)
8. [Configurações do Sistema](#configurações-do-sistema)
9. [Solução de Problemas](#solução-de-problemas)

## Introdução

Este manual foi desenvolvido para ajudar os administradores da plataforma OnlyWave a utilizar o painel administrativo de forma eficiente. O painel oferece ferramentas para gerenciar produtos, pedidos, usuários e visualizar métricas importantes do negócio.

## Acesso ao Painel

1. Acesse a URL do painel administrativo: `https://admin.onlywave.com`
2. Faça login com suas credenciais de administrador
3. Após o login bem-sucedido, você será redirecionado para o dashboard

## Dashboard

O dashboard é a tela principal do painel administrativo, oferecendo uma visão geral do negócio.

### KPIs Principais

O dashboard exibe os seguintes KPIs:

- **Vendas Totais**: Valor total das vendas no período selecionado
- **Total de Pedidos**: Número total de pedidos no período
- **Ticket Médio**: Valor médio por pedido
- **Pedidos Pendentes**: Número de pedidos aguardando processamento

### Gráficos

O dashboard apresenta três gráficos principais:

1. **Vendas por Mês**: Gráfico de barras mostrando a evolução das vendas
2. **Distribuição de Pedidos por Status**: Gráfico de pizza mostrando a proporção de pedidos em cada status
3. **Produtos Mais Vendidos**: Gráfico de barras horizontais com os produtos mais vendidos

### Filtros

Você pode filtrar os dados do dashboard por:

- **Período**: Hoje, últimos 7 dias, este mês, mês anterior ou período personalizado
- **Categoria**: Filtrar por categorias específicas de produtos
- **Método de Pagamento**: Filtrar por forma de pagamento
- **Status de Pedido**: Filtrar por status específico dos pedidos

Para aplicar os filtros:
1. Clique no botão "Mostrar Filtros" no topo do dashboard
2. Selecione os filtros desejados
3. Clique em "Aplicar Filtros"

## Gerenciamento de Produtos

### Listagem de Produtos

1. No menu lateral, clique em "Produtos"
2. A página de listagem exibe todos os produtos cadastrados
3. Utilize a barra de pesquisa para encontrar produtos específicos
4. Use os filtros para refinar a busca por categoria, preço, estoque, etc.

### Adicionar Novo Produto

1. Na página de listagem, clique no botão "Novo Produto"
2. Preencha os campos obrigatórios:
   - Nome do produto
   - Descrição
   - Preço
   - Categoria
   - Imagens (até 5 imagens)
3. Adicione características e especificações técnicas
4. Clique em "Salvar" para cadastrar o produto

### Editar Produto

1. Na listagem, clique no ícone de edição ao lado do produto desejado
2. Modifique os campos necessários
3. Clique em "Salvar" para atualizar o produto

### Excluir Produto

1. Na listagem, clique no ícone de exclusão ao lado do produto
2. Confirme a exclusão na caixa de diálogo

## Gerenciamento de Pedidos

### Listagem de Pedidos

1. No menu lateral, clique em "Pedidos"
2. A página exibe todos os pedidos realizados
3. Utilize a barra de pesquisa para encontrar pedidos específicos
4. Use os filtros para refinar a busca por status, data, cliente, etc.

### Detalhes do Pedido

1. Na listagem, clique no número do pedido para visualizar os detalhes
2. A página de detalhes exibe:
   - Informações do cliente
   - Itens do pedido
   - Endereço de entrega
   - Forma de pagamento
   - Histórico de status

### Atualizar Status do Pedido

1. Na página de detalhes do pedido, localize a seção de status
2. Selecione o novo status no menu dropdown
3. Clique em "Atualizar Status"
4. O sistema enviará uma notificação ao cliente sobre a mudança de status

## Gerenciamento de Usuários

### Listagem de Usuários

1. No menu lateral, clique em "Usuários"
2. A página exibe todos os usuários cadastrados
3. Utilize a barra de pesquisa para encontrar usuários específicos
4. Use os filtros para refinar a busca por tipo de usuário, status, etc.

### Adicionar Novo Usuário

1. Na página de listagem, clique no botão "Novo Usuário"
2. Preencha os campos obrigatórios:
   - Nome completo
   - E-mail
   - Senha
   - Tipo de usuário (cliente, administrador, etc.)
3. Clique em "Salvar" para cadastrar o usuário

### Editar Usuário

1. Na listagem, clique no ícone de edição ao lado do usuário desejado
2. Modifique os campos necessários
3. Clique em "Salvar" para atualizar o usuário

## Relatórios e Exportações

### Exportar Dados

1. No dashboard ou em qualquer página de listagem, clique no botão "Exportar"
2. Selecione o formato desejado:
   - **CSV**: Para análise em planilhas
   - **PDF**: Para relatórios formatados com gráficos

### Relatórios Personalizados

1. No menu lateral, clique em "Relatórios"
2. Selecione o tipo de relatório desejado
3. Configure os parâmetros do relatório (período, filtros, etc.)
4. Clique em "Gerar Relatório"
5. Faça o download ou visualize o relatório na tela

## Configurações do Sistema

### Configurações Gerais

1. No menu lateral, clique em "Configurações"
2. Na aba "Geral", configure:
   - Nome da loja
   - Logo
   - Informações de contato
   - Configurações de e-mail

### Configurações de Pagamento

1. Na aba "Pagamento", configure:
   - Chaves de API do Stripe
   - Configurações de PIX
   - Configurações de boleto

### Configurações de Entrega

1. Na aba "Entrega", configure:
   - Métodos de entrega
   - Regiões de entrega
   - Cálculo de frete

## Solução de Problemas

### Problemas Comuns

#### Não consigo fazer login
- Verifique se suas credenciais estão corretas
- Tente recuperar sua senha usando a opção "Esqueci minha senha"
- Entre em contato com o suporte se o problema persistir

#### Gráficos não estão carregando
- Verifique sua conexão com a internet
- Tente atualizar a página
- Limpe o cache do navegador

#### Exportação de relatórios falha
- Verifique se há dados disponíveis para o período selecionado
- Tente exportar em um formato diferente
- Reduza o período ou o escopo dos dados

### Contato com o Suporte

Se encontrar problemas não listados acima, entre em contato com o suporte técnico:
- E-mail: suporte@onlywave.com
- Telefone: (11) 1234-5678
- Horário de atendimento: Segunda a Sexta, das 9h às 18h 