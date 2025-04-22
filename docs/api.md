# Documentação da API - OnlyWave

## Visão Geral

A API do OnlyWave segue o padrão RESTful e utiliza JSON para formatação de dados. Todos os endpoints estão disponíveis em `https://api.onlywave.com/v1`.

## Autenticação

A API utiliza autenticação baseada em tokens JWT (JSON Web Tokens). Para autenticar suas requisições, inclua o token no cabeçalho `Authorization`:

```
Authorization: Bearer seu_token_jwt
```

### Obtenção do Token

Para obter um token de acesso, faça uma requisição POST para `/auth/login`:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "seu@email.com",
  "password": "sua_senha"
}
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "Nome do Usuário",
    "email": "seu@email.com",
    "role": "admin"
  }
}
```

## Endpoints

### Produtos

#### Listar Produtos

```http
GET /products
```

Parâmetros de consulta:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)
- `category`: Filtrar por categoria
- `search`: Termo de busca
- `sort`: Campo para ordenação (ex: price, name)
- `order`: Direção da ordenação (asc, desc)

Resposta:

```json
{
  "data": [
    {
      "id": "1",
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": 99.99,
      "category": "Categoria",
      "images": ["url1", "url2"],
      "features": ["feature1", "feature2"],
      "specifications": {
        "key1": "value1",
        "key2": "value2"
      },
      "stock": 10,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

#### Obter Produto por ID

```http
GET /products/:id
```

Resposta:

```json
{
  "id": "1",
  "name": "Produto Exemplo",
  "description": "Descrição do produto",
  "price": 99.99,
  "category": "Categoria",
  "images": ["url1", "url2"],
  "features": ["feature1", "feature2"],
  "specifications": {
    "key1": "value1",
    "key2": "value2"
  },
  "stock": 10,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Criar Produto

```http
POST /products
Content-Type: application/json

{
  "name": "Novo Produto",
  "description": "Descrição do novo produto",
  "price": 149.99,
  "category": "Categoria",
  "images": ["url1", "url2"],
  "features": ["feature1", "feature2"],
  "specifications": {
    "key1": "value1",
    "key2": "value2"
  },
  "stock": 20
}
```

Resposta:

```json
{
  "id": "2",
  "name": "Novo Produto",
  "description": "Descrição do novo produto",
  "price": 149.99,
  "category": "Categoria",
  "images": ["url1", "url2"],
  "features": ["feature1", "feature2"],
  "specifications": {
    "key1": "value1",
    "key2": "value2"
  },
  "stock": 20,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Atualizar Produto

```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Produto Atualizado",
  "price": 199.99,
  "stock": 15
}
```

Resposta:

```json
{
  "id": "1",
  "name": "Produto Atualizado",
  "description": "Descrição do produto",
  "price": 199.99,
  "category": "Categoria",
  "images": ["url1", "url2"],
  "features": ["feature1", "feature2"],
  "specifications": {
    "key1": "value1",
    "key2": "value2"
  },
  "stock": 15,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Excluir Produto

```http
DELETE /products/:id
```

Resposta:

```json
{
  "success": true,
  "message": "Produto excluído com sucesso"
}
```

### Pedidos

#### Listar Pedidos

```http
GET /orders
```

Parâmetros de consulta:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)
- `status`: Filtrar por status
- `startDate`: Data inicial (formato: YYYY-MM-DD)
- `endDate`: Data final (formato: YYYY-MM-DD)
- `userId`: Filtrar por usuário

Resposta:

```json
{
  "data": [
    {
      "id": "1",
      "userId": "123",
      "items": [
        {
          "productId": "1",
          "name": "Produto Exemplo",
          "price": 99.99,
          "quantity": 2
        }
      ],
      "total": 199.98,
      "status": "pending",
      "paymentMethod": "credit_card",
      "shippingAddress": {
        "street": "Rua Exemplo",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Bairro",
        "city": "Cidade",
        "state": "Estado",
        "zipCode": "12345-678"
      },
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

#### Obter Pedido por ID

```http
GET /orders/:id
```

Resposta:

```json
{
  "id": "1",
  "userId": "123",
  "items": [
    {
      "productId": "1",
      "name": "Produto Exemplo",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "total": 199.98,
  "status": "pending",
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
  },
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Criar Pedido

```http
POST /orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    }
  ],
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
  }
}
```

Resposta:

```json
{
  "id": "2",
  "userId": "123",
  "items": [
    {
      "productId": "1",
      "name": "Produto Exemplo",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "total": 199.98,
  "status": "pending",
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
  },
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Atualizar Status do Pedido

```http
PATCH /orders/:id/status
Content-Type: application/json

{
  "status": "processing"
}
```

Resposta:

```json
{
  "id": "1",
  "userId": "123",
  "items": [
    {
      "productId": "1",
      "name": "Produto Exemplo",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "total": 199.98,
  "status": "processing",
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
  },
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

### Usuários

#### Listar Usuários

```http
GET /users
```

Parâmetros de consulta:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)
- `role`: Filtrar por papel (admin, customer)
- `search`: Termo de busca

Resposta:

```json
{
  "data": [
    {
      "id": "123",
      "name": "Nome do Usuário",
      "email": "usuario@email.com",
      "role": "customer",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

#### Obter Usuário por ID

```http
GET /users/:id
```

Resposta:

```json
{
  "id": "123",
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "role": "customer",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Criar Usuário

```http
POST /users
Content-Type: application/json

{
  "name": "Novo Usuário",
  "email": "novo@email.com",
  "password": "senha123",
  "role": "customer"
}
```

Resposta:

```json
{
  "id": "124",
  "name": "Novo Usuário",
  "email": "novo@email.com",
  "role": "customer",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### Atualizar Usuário

```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Nome Atualizado",
  "role": "admin"
}
```

Resposta:

```json
{
  "id": "123",
  "name": "Nome Atualizado",
  "email": "usuario@email.com",
  "role": "admin",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

### Dashboard

#### Obter Estatísticas

```http
GET /dashboard/stats
```

Parâmetros de consulta:
- `startDate`: Data inicial (formato: YYYY-MM-DD)
- `endDate`: Data final (formato: YYYY-MM-DD)
- `categories`: Lista de categorias (separadas por vírgula)
- `paymentMethods`: Lista de métodos de pagamento (separados por vírgula)
- `orderStatus`: Lista de status de pedido (separados por vírgula)

Resposta:

```json
{
  "totalSales": 9999.99,
  "totalOrders": 100,
  "totalCustomers": 50,
  "averageTicket": 99.99,
  "salesByMonth": [
    {
      "month": "2023-01",
      "sales": 4999.99
    },
    {
      "month": "2023-02",
      "sales": 5000.00
    }
  ],
  "topProducts": [
    {
      "name": "Produto Mais Vendido",
      "quantity": 25
    },
    {
      "name": "Segundo Mais Vendido",
      "quantity": 20
    }
  ]
}
```

#### Exportar CSV

```http
GET /dashboard/export/csv
```

Parâmetros de consulta:
- `startDate`: Data inicial (formato: YYYY-MM-DD)
- `endDate`: Data final (formato: YYYY-MM-DD)
- `categories`: Lista de categorias (separadas por vírgula)
- `paymentMethods`: Lista de métodos de pagamento (separados por vírgula)
- `orderStatus`: Lista de status de pedido (separados por vírgula)

Resposta: Arquivo CSV para download

#### Exportar PDF

```http
GET /dashboard/export/pdf
```

Parâmetros de consulta:
- `startDate`: Data inicial (formato: YYYY-MM-DD)
- `endDate`: Data final (formato: YYYY-MM-DD)
- `categories`: Lista de categorias (separadas por vírgula)
- `paymentMethods`: Lista de métodos de pagamento (separados por vírgula)
- `orderStatus`: Lista de status de pedido (separados por vírgula)

Resposta: Arquivo PDF para download

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Requisição inválida
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Não autorizado
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

## Limites de Requisição

A API possui os seguintes limites de requisição:
- 100 requisições por minuto para endpoints públicos
- 1000 requisições por minuto para endpoints autenticados

## Suporte

Para suporte técnico, entre em contato:
- E-mail: api@onlywave.com
- Documentação: https://docs.onlywave.com 