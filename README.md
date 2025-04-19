# API de Portfólio

API RESTful desenvolvida em Node.js para gerenciar projetos de um portfólio pessoal. Permite operações CRUD (Create, Read, Update, Delete) para projetos, com suporte a MySQL e documentação Swagger.

## 🚀 Tecnologias

- Node.js
- Express
- MySQL
- Sequelize ORM
- Swagger UI
- Cors

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)

## 🔧 Instalação Local

1. Clone o repositório

```bash
git clone https://github.com/pagansdev/portfolio-api.git
cd portfolio-api
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
# Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=portfolio
DB_PORT=3306
```

4. Inicialize o banco de dados

```bash
npm run init-db
```

## 🚀 Executando

Para desenvolvimento:

```bash
npm run dev
```

Para produção:

```bash
npm start
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:

```
http://localhost:3000/api-docs
```

### Endpoints Disponíveis

- `GET /projects` - Lista todos os projetos
- `GET /projects/:id` - Busca um projeto específico
- `POST /projects` - Cria um novo projeto
- `PUT /projects/:id` - Atualiza um projeto existente
- `DELETE /projects/:id` - Remove um projeto

### Exemplo de Projeto

```json
{
  "name": "Meu Projeto",
  "thumbnailUrl": "https://exemplo.com/imagem.jpg",
  "repositoryUrl": "https://github.com/usuario/projeto",
  "siteUrl": "https://teste.com",
  "technologies": ["Node.js", "MySQL"],
  "description": "Uma aplicação web de teste"
}
```

## 🌐 Deploy

Esta API está configurada para deploy no Railway. Siga as instruções abaixo para fazer o deploy:

1. Crie uma conta no [Railway](https://railway.app)

2. Instale o Railway CLI:

```bash
npm i -g @railway/cli
```

3. Faça login no Railway:

```bash
railway login
```

4. Inicialize o projeto:

```bash
railway init
```

5. Provisione um banco de dados MySQL:

```bash
railway add mysql
```

6. Configure as variáveis de ambiente no Railway:

- `NODE_ENV=production`
- `DB_HOST` (fornecido pelo Railway)
- `DB_USER` (fornecido pelo Railway)
- `DB_PASS` (fornecido pelo Railway)
- `DB_NAME` (fornecido pelo Railway)
- `DB_PORT` (fornecido pelo Railway)
- `API_URL` (URL da sua API após o deploy)

7. Faça o deploy:

```bash
railway up
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
