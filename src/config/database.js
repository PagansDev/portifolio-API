const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  // Construir a URL do MySQL manualmente
  const dbUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`;

  console.log('Tentando conectar ao MySQL com as seguintes configurações:', {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQLUSER,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
  });

  sequelize = new Sequelize(dbUrl, {
    dialect: 'mysql',
    logging: true, // Habilitando logs para debug
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
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

// Teste de conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
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
  });

module.exports = sequelize;
