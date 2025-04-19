const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Portfólio',
      version: '1.0.0',
      description: 'API para gerenciamento de projetos do portfólio',
      contact: {
        name: 'Seu Nome',
        email: 'seu.email@exemplo.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description:
          process.env.NODE_ENV === 'production'
            ? 'Servidor de produção'
            : 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Project: {
          type: 'object',
          required: [
            'name',
            'thumbnailUrl',
            'repositoryUrl',
            'siteUrl',
            'technologies',
            'description',
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'ID do projeto (gerado automaticamente)',
              readOnly: true,
            },
            name: {
              type: 'string',
              description: 'Nome do projeto',
              example: 'Meu Projeto Incrível',
            },
            thumbnailUrl: {
              type: 'string',
              description: 'URL da miniatura do projeto',
              example: 'https://exemplo.com/imagem.jpg',
            },
            repositoryUrl: {
              type: 'string',
              description: 'URL do repositório do projeto',
              example: 'https://github.com/usuario/projeto',
            },
            siteUrl: {
              type: 'string',
              description: 'URL do site do projeto',
              example: 'https://meusite.com',
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de tecnologias utilizadas no projeto',
              example: ['React', 'Node.js', 'MySQL'],
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do projeto',
              example:
                'Uma aplicação web moderna para gerenciamento de tarefas',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description:
                'Data de criação do projeto (gerado automaticamente)',
              readOnly: true,
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description:
                'Data de atualização do projeto (gerado automaticamente)',
              readOnly: true,
            },
          },
        },
        ProjectInput: {
          type: 'object',
          required: [
            'name',
            'thumbnailUrl',
            'repositoryUrl',
            'siteUrl',
            'technologies',
            'description',
          ],
          properties: {
            name: {
              type: 'string',
              example: 'Meu Projeto Incrível',
            },
            thumbnailUrl: {
              type: 'string',
              example: 'https://exemplo.com/imagem.jpg',
            },
            repositoryUrl: {
              type: 'string',
              example: 'https://github.com/usuario/projeto',
            },
            siteUrl: {
              type: 'string',
              example: 'https://meusite.com',
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['React', 'Node.js', 'MySQL'],
            },
            description: {
              type: 'string',
              example:
                'Uma aplicação web moderna para gerenciamento de tarefas',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
