require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/database');

// Swagger configuration
const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Portfolio API',
    description: 'API para gerenciamento de portfólio profissional',
  },
  host: process.env.API_URL || 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Projects',
      description: 'Endpoints para gerenciamento de projetos',
    },
    {
      name: 'Auth',
      description: 'Endpoints para autenticação',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Adicione 'Bearer ' antes do token JWT",
    },
  },
  paths: {
    '/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registra um novo usuário (apenas dono da aplicação)',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Dados do usuário',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password', 'registrationKey'],
              properties: {
                username: {
                  type: 'string',
                  example: 'admin',
                },
                password: {
                  type: 'string',
                  example: 'senha123',
                },
                registrationKey: {
                  type: 'string',
                  example: 'chave-secreta',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Usuário registrado com sucesso',
          },
          400: {
            description: 'Erro ao registrar usuário',
          },
          401: {
            description: 'Chave de registro inválida',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Autentica um usuário',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Credenciais do usuário',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password'],
              properties: {
                username: {
                  type: 'string',
                  example: 'admin',
                },
                password: {
                  type: 'string',
                  example: 'senha123',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
          401: {
            description: 'Credenciais inválidas',
          },
        },
      },
    },
    '/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Lista todos os projetos',
        responses: {
          200: {
            description: 'Lista de projetos retornada com sucesso',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Project',
              },
            },
          },
        },
      },
      post: {
        tags: ['Projects'],
        summary: 'Cria um novo projeto',
        security: [
          {
            Bearer: [],
          },
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Dados do projeto',
            required: true,
            schema: {
              $ref: '#/definitions/ProjectInput',
            },
          },
        ],
        responses: {
          201: {
            description: 'Projeto criado com sucesso',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
          401: {
            description: 'Não autorizado',
          },
          400: {
            description: 'Dados inválidos',
          },
        },
      },
    },
    '/projects/{id}': {
      get: {
        tags: ['Projects'],
        summary: 'Busca um projeto específico',
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true,
            description: 'ID do projeto',
          },
        ],
        responses: {
          200: {
            description: 'Projeto encontrado',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
          404: {
            description: 'Projeto não encontrado',
          },
        },
      },
      put: {
        tags: ['Projects'],
        summary: 'Atualiza um projeto',
        security: [
          {
            Bearer: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true,
            description: 'ID do projeto',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Dados do projeto',
            required: true,
            schema: {
              $ref: '#/definitions/ProjectInput',
            },
          },
        ],
        responses: {
          200: {
            description: 'Projeto atualizado com sucesso',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
          401: {
            description: 'Não autorizado',
          },
          404: {
            description: 'Projeto não encontrado',
          },
        },
      },
      delete: {
        tags: ['Projects'],
        summary: 'Remove um projeto',
        security: [
          {
            Bearer: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true,
            description: 'ID do projeto',
          },
        ],
        responses: {
          204: {
            description: 'Projeto removido com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
          404: {
            description: 'Projeto não encontrado',
          },
        },
      },
    },
  },
  definitions: {
    Project: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        title: {
          type: 'string',
          example: 'Meu Projeto',
        },
        description: {
          type: 'string',
          example: 'Descrição do projeto',
        },
        image: {
          type: 'string',
          example: 'https://exemplo.com/imagem.jpg',
        },
        link: {
          type: 'string',
          example: 'https://exemplo.com/projeto',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    ProjectInput: {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: {
          type: 'string',
          example: 'Meu Projeto',
        },
        description: {
          type: 'string',
          example: 'Descrição do projeto',
        },
        image: {
          type: 'string',
          example: 'https://exemplo.com/imagem.jpg',
        },
        link: {
          type: 'string',
          example: 'https://exemplo.com/projeto',
        },
      },
    },
  },
};

// Importar os modelos para garantir que sejam registrados
require('./models/Project');

const app = express();

// Configuração do CORS - mais permissiva para desenvolvimento
app.use(cors());

// Middleware para adicionar headers de CORS manualmente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', true);

  // Responder imediatamente a requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use(routes);

// Sincronização do banco de dados
sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

// Iniciar o servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
  console.log(`Documentação disponível em: /api-docs`);
});
