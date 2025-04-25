const Sequelize = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;

const initializeDatabase = async () => {
  try {
    console.log('Iniciando conexão com o banco de dados...');
    console.log('Ambiente:', env);

    if (!process.env[dbConfig.use_env_variable]) {
      throw new Error(
        `Variável de ambiente ${dbConfig.use_env_variable} não definida`
      );
    }

    const databaseUrl = process.env[dbConfig.use_env_variable];
    console.log('URL do banco de dados definida:', !!databaseUrl);

    sequelize = new Sequelize(databaseUrl, {
      ...dbConfig,
      logging: (msg) => console.log('[Database]', msg),
      pool: {
        max: 5,
        min: 0,
        acquire: 60000, // Aumentado para 60 segundos
        idle: 10000,
      },
      retry: {
        max: 10, // Aumentado número de tentativas
        timeout: 60000, // Timeout de 60 segundos
        match: [
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/,
          /TimeoutError/,
          /Operation timeout/,
        ],
      },
      dialectOptions: {
        ...dbConfig.dialectOptions,
        connectTimeout: 60000, // Timeout de conexão de 60 segundos
      },
    });

    console.log('Tentando autenticar conexão...');
    await sequelize.authenticate();
    console.log('Conexão autenticada com sucesso');

    return sequelize;
  } catch (err) {
    console.error('Erro detalhado ao conectar com o banco de dados:', {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
    throw err;
  }
};

module.exports = initializeDatabase();
