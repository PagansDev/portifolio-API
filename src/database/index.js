const Sequelize = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const initializeDatabase = async () => {
  try {
    console.log('Iniciando conexão com o banco de dados...');

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não está definida');
    }

    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: false,
      },
      pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    });

    // Teste simples de conexão
    await sequelize.query('SELECT 1+1 as result');
    console.log('Conexão com o banco de dados estabelecida com sucesso');

    return sequelize;
  } catch (err) {
    console.error('Erro ao conectar com o banco de dados:', {
      message: err.message,
      code: err.original?.code,
      errno: err.original?.errno,
    });
    throw err;
  }
};

module.exports = initializeDatabase();
