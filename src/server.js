require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/database');
const swaggerSpecs = require('./config/swagger');
const initializeDatabase = require('./database/init-prod');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rotas
app.use(routes);

// Sincronização do banco de dados
if (process.env.NODE_ENV === 'production') {
  initializeDatabase()
    .then(() => {
      console.log('Banco de dados inicializado em produção');
    })
    .catch((error) => {
      console.error('Erro ao inicializar banco de dados:', error);
    });
} else {
  sequelize
    .sync()
    .then(() => {
      console.log('Banco de dados sincronizado');
    })
    .catch((error) => {
      console.error('Erro ao sincronizar banco de dados:', error);
    });
}

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(
    `Documentação disponível em: ${
      process.env.API_URL || 'http://localhost:' + PORT
    }/api-docs`
  );
});
