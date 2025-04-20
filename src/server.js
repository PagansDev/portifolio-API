require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/database');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rotas
app.use(routes);

// Sincronização do banco de dados
sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

// Iniciar o servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
  console.log(`Documentação disponível em: /api-docs`);
});
