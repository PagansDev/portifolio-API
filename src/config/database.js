const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  // Forçar uso de IPv4
  const dbConfig = {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectTimeout: 60000,
    },
    logging: console.log,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

  console.log('Tentando conectar ao MySQL com as seguintes configurações:', {
    database: dbConfig.database,
    username: dbConfig.username,
    host: dbConfig.host,
    port: dbConfig.port,
  });

  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      dialectOptions: dbConfig.dialectOptions,
      logging: dbConfig.logging,
      define: dbConfig.define,
      pool: dbConfig.pool,
    }
  );
} else {
  // Configuração para desenvolvimento local
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
      },
    }
  );
}

// Teste de conexão com retry
const maxRetries = 5;
let currentRetry = 0;

function tryConnect() {
  return sequelize
    .authenticate()
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
      console.error('Tentativa', currentRetry + 1, 'de', maxRetries);
      console.error('Não foi possível conectar ao banco de dados:', err);
      console.error('Ambiente:', process.env.NODE_ENV);
      console.error('Detalhes da configuração:', {
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQLUSER,
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        password: process.env.MYSQL_ROOT_PASSWORD
          ? '[DEFINIDA]'
          : '[NÃO DEFINIDA]',
      });

      if (currentRetry < maxRetries) {
        currentRetry++;
        console.log('Tentando reconectar em 5 segundos...');
        return new Promise((resolve) => setTimeout(resolve, 5000)).then(
          tryConnect
        );
      }

      throw err;
    });
}

tryConnect();

module.exports = sequelize;
