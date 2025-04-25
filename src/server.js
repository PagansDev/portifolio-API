require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const initializeDatabase = require('./database');

// Swagger configuration
const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.2.1',
    title: 'Portfolio API',
    description: 'API para gerenciamento de portfólio profissional',
  },
  host: process.env.RAILWAY_STATIC_URL || 'localhost:3000',
  basePath: '/',
  schemes: ['https', 'http'],
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
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Digite: Bearer {seu_token} para autenticação',
    },
  },
  paths: {
    '/register': {
      post: {
        tags: ['Autenticação'],
        summary: 'Registrar um novo usuário',
        description: 'Cria um novo usuário com as credenciais fornecidas',
        parameters: [
          {
            in: 'body',
            name: 'credentials',
            required: true,
            schema: {
              $ref: '#/definitions/RegisterCredentials',
            },
          },
        ],
        responses: {
          201: {
            description: 'Usuário registrado com sucesso',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          400: {
            description: 'Dados inválidos ou usuário já existe',
          },
          403: {
            description: 'Chave de registro inválida',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Autenticar usuário',
        description: 'Autentica um usuário e retorna um token JWT',
        parameters: [
          {
            in: 'body',
            name: 'credentials',
            required: true,
            schema: {
              $ref: '#/definitions/LoginCredentials',
            },
          },
        ],
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            schema: {
              $ref: '#/definitions/AuthResponse',
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
        tags: ['Projetos'],
        summary: 'Lista todos os projetos',
        description: 'Retorna uma lista de todos os projetos cadastrados',
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
        tags: ['Projetos'],
        summary: 'Cria um novo projeto',
        description: 'Cria um novo projeto (requer autenticação)',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'body',
            name: 'project',
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
            description: 'Não autorizado - Token ausente ou inválido',
          },
        },
      },
    },
    '/projects/{id}': {
      get: {
        tags: ['Projetos'],
        summary: 'Obtém um projeto específico',
        description: 'Retorna os detalhes de um projeto específico',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            description: 'ID do projeto',
          },
        ],
        responses: {
          200: {
            description: 'Projeto encontrado com sucesso',
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
        tags: ['Projetos'],
        summary: 'Atualiza um projeto',
        description:
          'Atualiza os dados de um projeto existente (requer autenticação)',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            description: 'ID do projeto',
          },
          {
            in: 'body',
            name: 'project',
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
            description: 'Não autorizado - Token ausente ou inválido',
          },
          404: {
            description: 'Projeto não encontrado',
          },
        },
      },
      delete: {
        tags: ['Projetos'],
        summary: 'Remove um projeto',
        description: 'Remove um projeto existente (requer autenticação)',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            description: 'ID do projeto',
          },
        ],
        responses: {
          204: {
            description: 'Projeto removido com sucesso',
          },
          401: {
            description: 'Não autorizado - Token ausente ou inválido',
          },
          404: {
            description: 'Projeto não encontrado',
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Status'],
        summary: 'Verifica o status da API',
        responses: {
          200: {
            description: 'API funcionando normalmente',
          },
        },
      },
    },
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Informações básicas da API',
        responses: {
          200: {
            description: 'Informações sobre a API',
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
          example: 'Meu Projeto Incrível',
        },
        description: {
          type: 'string',
          example: 'Uma descrição detalhada do projeto',
        },
        thumbnailUrl: {
          type: 'string',
          example: 'https://exemplo.com/imagem.jpg',
        },
        repositoryUrl: {
          type: 'string',
          example: 'https://github.com/seu-usuario/projeto',
        },
        siteUrl: {
          type: 'string',
          example: 'https://seu-projeto.com',
        },
        technologies: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['React', 'Node.js', 'Express'],
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
          example: 'Meu Projeto Incrível',
        },
        description: {
          type: 'string',
          example: 'Uma descrição detalhada do projeto',
        },
        thumbnailUrl: {
          type: 'string',
          example: 'https://exemplo.com/imagem.jpg',
        },
        repositoryUrl: {
          type: 'string',
          example: 'https://github.com/seu-usuario/projeto',
        },
        siteUrl: {
          type: 'string',
          example: 'https://seu-projeto.com',
        },
        technologies: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['React', 'Node.js', 'Express'],
        },
      },
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        username: {
          type: 'string',
          example: 'usuario123',
        },
        password: {
          type: 'string',
          example: 'senha123',
          description: 'A senha será hasheada antes de ser armazenada',
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
    LoginCredentials: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
          example: 'usuario123',
        },
        password: {
          type: 'string',
          example: 'senha123',
        },
      },
    },
    RegisterCredentials: {
      type: 'object',
      required: ['username', 'password', 'registrationKey'],
      properties: {
        username: {
          type: 'string',
          example: 'usuario123',
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
    AuthResponse: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  },
};

// Importar os modelos para garantir que sejam registrados
require('./models/Project');

const app = express();

// Configuração básica
app.use(cors());
app.use(express.json());

// Status da aplicação
const appStatus = {
  ready: false,
  database: false,
  startTime: new Date(),
};

// Healthcheck endpoint - mantém a mesma simplicidade que funcionou
app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

// Endpoint de status mais detalhado para diagnóstico
app.get('/status', (_, res) => {
  res.json({
    ...appStatus,
    uptime: `${Math.floor((new Date() - appStatus.startTime) / 1000)}s`,
  });
});

// Middleware para verificar se o banco está pronto
const requireDatabase = async (req, res, next) => {
  if (!appStatus.database) {
    return res.status(503).json({
      error: 'Serviço inicializando, tente novamente em alguns segundos',
    });
  }
  next();
};

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API - todas exceto /health e /status requerem banco de dados
app.use('/api', requireDatabase, routes);

// Função de inicialização do servidor
const startServer = async () => {
  // Inicia o servidor HTTP primeiro
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor HTTP iniciado na porta ${port}`);
    appStatus.ready = true;
  });

  try {
    // Tenta conectar ao banco de dados
    console.log('Tentando conectar ao banco de dados...');
    await initializeDatabase;
    console.log('Conexão com banco de dados estabelecida');
    appStatus.database = true;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    // Não derrubamos o servidor, apenas logamos o erro
    // O Railway vai tentar reiniciar se necessário
  }
};

// Inicia o servidor
console.log('Iniciando servidor...');
startServer().catch((error) => {
  console.error('Erro fatal:', error);
  // Só encerramos em caso de erro fatal na inicialização do HTTP
  process.exit(1);
});
