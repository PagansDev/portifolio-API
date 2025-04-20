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

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `DATABASE_URL`: URL completa de conexão com o banco de dados MySQL

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
```

3. Suba um repositório no seu github com esse projeto.

### Deploy no Railway

1. Faça login na sua conta do Railway
2. Crie um novo projeto
3. Adicione um serviço MySQL
4. No serviço MySQL, clique em "Connect" e copie a URL de conexão
5. Conecte seu repositório GitHub ao projeto
6. No seu projeto, clique no seu repositório, adicione a variável `DATABASE_URL` com a URL copiada
7. No topo do seu painel, deverá ter a opção de aplicar as mudanças e fazer deploy
8. O Railway fará o deploy automático após isso
9. Para utilização, deverá ir no painel da railway do seu projeto, clicar no seu repositório e navegar para Settings>Networking e clicar em Generate Domain.
10. Com seu dominio publico gerado basta utilizar no seu portifólio, poderá cadastrar novos projetos utilizando o swagger(/api-docs) ou um serviço como Postman, e até mesmo criando um painel de Admin no seu portifólio.

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
- Documentação automática da API
- CORS configurado
- SSL habilitado

## Observações

- O projeto está configurado para rodar exclusivamente em produção no Railway
- Todas as conexões com o banco de dados são feitas via SSL
- A documentação da API é atualizada automaticamente com as alterações no código
