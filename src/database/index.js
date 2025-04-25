const Sequelize = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;

const initializeDatabase = async () => {
  try {
    if (!process.env[dbConfig.use_env_variable]) {
      throw new Error(
        `Variável de ambiente ${dbConfig.use_env_variable} não definida`
      );
    }

    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
      ...dbConfig,
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      retry: {
        max: 5,
        timeout: 3000,
      },
    });

    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize;
  } catch (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    throw err;
  }
};

module.exports = initializeDatabase();
