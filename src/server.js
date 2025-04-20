require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/database');
const swaggerSpecs = require('./config/swagger');

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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
