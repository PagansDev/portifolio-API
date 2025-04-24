require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/database');
const swaggerOptions = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API para gerenciamento de portfólio profissional',
    },
    host: process.env.API_URL || 'localhost:3000',
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'Insira o token JWT com o prefixo Bearer. Exemplo: "Bearer {token}"',
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
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
            example: 'Projeto Exemplo',
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
            example: 'https://exemplo.com',
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
            example: 'Projeto Exemplo',
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
            example: 'https://exemplo.com',
          },
        },
      },
    },
  },
  apis: ['./src/routes.js'],
};

// Importar os modelos para garantir que sejam registrados
require('./models/Project');

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Headers permitidos
    credentials: true, // Permite credenciais
    optionsSuccessStatus: 200, // Status de sucesso para requisições OPTIONS
  })
);

app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

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
