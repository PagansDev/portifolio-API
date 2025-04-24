# Portfolio API

API para gerenciamento de portfólio profissional, desenvolvida com Node.js, Express e MySQL.

Você tem um portifólio e está cansado de atualizar manualmente(hardcoded) seus projetos pessoais? Basta utilizar essa API e fazer o deploy no Railway.

Essa API irá prover URLs para a miniatura do projeto(suba sua minuatura em algum serviço de imagem com link publico), do repositório no github, do deploy da aplicação, assim como uma descrição e tecnologias utilizadas.

Com a aplicação rodando, basta consumi-la no front-end com seus componentes dinâmicos e popular seu portfólio.

## Funcionalidades

- Autenticação JWT
- CRUD de projetos
- Documentação Swagger
- Banco de dados MySQL
- CORS configurado
- Variáveis de ambiente

## Tecnologias

- Node.js
- Express
- MySQL
- Sequelize ORM
- JWT (JSON Web Tokens)
- Swagger UI
- Bcrypt
- CORS

## Deploy no Railway

1. Faça login na sua conta do Railway
2. Crie um novo projeto
3. Adicione um serviço MySQL
4. No serviço MySQL, clique em "Connect" e copie a URL de conexão
5. Conecte seu repositório GitHub ao projeto
6. No seu projeto, clique no seu repositório, adicione as variáveis:
   - `DATABASE_URL`: URL de conexão copiada do serviço MySQL em formato de template string ${{...}}
   - `JWT_SECRET`: Uma string aleatória para assinar os tokens
   - `REGISTRATION_KEY`: Uma chave secreta para controlar o registro de usuários
7. No topo do seu painel, deverá ter a opção de aplicar as mudanças e fazer deploy
8. O Railway fará o deploy automático após isso
9. Para utilização, deverá ir no painel da railway do seu projeto, clicar no seu repositório e navegar para Settings>Networking e clicar em Generate Domain.

## Autenticação

A API utiliza autenticação JWT (JSON Web Tokens). Para acessar as rotas protegidas, você precisa:

1. Registrar um usuário (apenas o dono da aplicação):

```bash
POST /register
{
  "username": "seu-usuario",
  "password": "sua-senha",
  "registrationKey": "mesma-chave-de-registro-das-variaveis-de-ambiente"
}
```

2. Fazer login para obter o token:

```bash
POST /login
{
  "username": "seu-usuario",
  "password": "sua-senha"
}
```

3. Usar o token em requisições subsequentes:

```bash
Authorization: Bearer seu-token-jwt
```

## Rotas

### Públicas

- `GET /projects` - Lista todos os projetos
- `GET /projects/:id` - Busca um projeto específico
- `POST /login` - Autentica um usuário

### Protegidas (requerem token JWT)

- `POST /projects` - Cria um novo projeto
- `PUT /projects/:id` - Atualiza um projeto
- `DELETE /projects/:id` - Remove um projeto
- `POST /register` - Registra um novo usuário (requer chave de registro)

## Documentação

A documentação da API está disponível em `/api-docs` após o deploy. Ela foi criada usando Swagger e contém todas as rotas disponíveis, seus parâmetros e exemplos de uso.

## Segurança

- Todas as senhas são hashed usando bcrypt
- Rotas protegidas requerem token JWT válido
- Registro de usuários requer chave de registro
- CORS configurado para permitir apenas origens específicas
- Validação de dados em todas as rotas

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

## Observações

- O projeto está configurado para rodar exclusivamente em produção no Railway
- Todas as conexões com o banco de dados são feitas via SSL
- A documentação da API é atualizada automaticamente com as alterações no código
- As operações de criação, atualização e exclusão de projetos requerem autenticação
