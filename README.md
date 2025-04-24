# Portfólio API

API para gerenciamento de portfólio profissional, desenvolvida com Node.js, Express e MySQL.

Você tem um portifólio e está cansado de atualizar manualmente(hardcoded) seus projetos pessoais? Basta utilizar essa API e fazer o deploy no Railway.

Essa API irá prover URLs para a miniatura do projeto(suba sua minuatura em algum serviço de imagem com link publico), do repositório no github, do deploy da aplicação, assim como uma descrição e tecnologias utilizadas.

Com a aplicação rodando, basta consumi-la no front-end com seus componentes dinâmicos e popular seu portifólio.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- Swagger (Documentação)
- Railway (Deploy)
- JWT (Autenticação)

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `DATABASE_URL`: URL completa de conexão com o banco de dados MySQL
- `JWT_SECRET`: Chave secreta para geração de tokens JWT (crie uma string aleatória)

## 🔧 Instalação Local

1. Clone o repositório

```bash
git clone https://github.com/pagansdev/portfolio-api.git
cd portfolio-api
```

2. Configure as variáveis de ambiente

```bash
# Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
DATABASE_URL = ""
JWT_SECRET = "sua_chave_secreta_aqui"
```

3. Suba um repositório no seu github com esse projeto.

### Deploy no Railway

1. Faça login na sua conta do Railway
2. Crie um novo projeto
3. Adicione um serviço MySQL
4. No serviço MySQL, clique em "Connect" e copie a URL de conexão
5. Conecte seu repositório GitHub ao projeto
6. No seu projeto, clique no seu repositório, adicione as variáveis:
   - `DATABASE_URL`: URL de conexão copiada do serviço MySQL em formato de template string ${{...}}
   - `JWT_SECRET`: Uma string aleatória para assinar os tokens
7. No topo do seu painel, deverá ter a opção de aplicar as mudanças e fazer deploy
8. O Railway fará o deploy automático após isso
9. Para utilização, deverá ir no painel da railway do seu projeto, clicar no seu repositório e navegar para Settings>Networking e clicar em Generate Domain.

## Autenticação

A API utiliza autenticação JWT para proteger as operações de criação, atualização e exclusão de projetos. Para obter acesso:

1. Registre um usuário:

```bash
POST /register
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

2. Faça login para obter o token:

```bash
POST /login
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

3. Use o token retornado no header de todas as requisições protegidas:

```bash
Authorization: Bearer seu_token_jwt
```

## Documentação da API

A documentação da API está disponível em `/api-docs` após o deploy. Ela foi criada usando Swagger e contém todas as rotas disponíveis, seus parâmetros e exemplos de uso.

## Estrutura do Projeto

```
src/
├── config/
│   ├── database.js    # Configuração do banco de dados
│   └── swagger.js     # Configuração do Swagger
├── controllers/       # Controladores da aplicação
├── middlewares/       # Middlewares (autenticação)
├── models/           # Modelos do Sequelize
├── routes/           # Rotas da API
└── server.js         # Arquivo principal da aplicação
```

## Funcionalidades

- CRUD de projetos
- Autenticação JWT
- Documentação automática da API
- CORS configurado
- SSL habilitado

## Observações

- O projeto está configurado para rodar exclusivamente em produção no Railway
- Todas as conexões com o banco de dados são feitas via SSL
- A documentação da API é atualizada automaticamente com as alterações no código
- As operações de criação, atualização e exclusão de projetos requerem autenticação
