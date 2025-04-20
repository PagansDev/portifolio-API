# Portfólio API

API para gerenciamento de portfólio profissional, desenvolvida com Node.js, Express e MySQL.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- Swagger (Documentação)
- Railway (Deploy)

## Configuração do Ambiente

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `DATABASE_URL`: URL completa de conexão com o banco de dados MySQL
- `PORT`: Porta em que o servidor irá rodar (gerenciada automaticamente pelo Railway)

### Deploy no Railway

1. Faça login na sua conta do Railway
2. Crie um novo projeto
3. Adicione um serviço MySQL
4. No serviço MySQL, clique em "Connect" e copie a URL de conexão
5. No seu projeto, adicione a variável `DATABASE_URL` com a URL copiada
6. Conecte seu repositório GitHub ao projeto
7. O Railway fará o deploy automático

## Documentação da API

A documentação da API está disponível em `/api-docs` após o deploy. Ela foi criada usando Swagger e contém todas as rotas disponíveis, seus parâmetros e exemplos de uso.

## Estrutura do Projeto

```
src/
├── config/
│   ├── database.js    # Configuração do banco de dados
│   └── swagger.js     # Configuração do Swagger
├── controllers/       # Controladores da aplicação
├── models/           # Modelos do Sequelize
├── routes/           # Rotas da API
└── server.js         # Arquivo principal da aplicação
```

## Funcionalidades

- CRUD de projetos
- CRUD de habilidades
- CRUD de experiências
- Documentação automática da API
- CORS configurado
- SSL habilitado

## Observações

- O projeto está configurado para rodar exclusivamente em produção no Railway
- Todas as conexões com o banco de dados são feitas via SSL
- A documentação da API é atualizada automaticamente com as alterações no código
