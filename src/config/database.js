const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  console.log(
    'Conectando ao MySQL em produção com as seguintes configurações:',
    {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQLUSER,
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
    }
  );

  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQL_ROOT_PASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      dialect: 'mysql',
      logging: false,
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

// Teste de conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
    console.error('Ambiente:', process.env.NODE_ENV);
    console.error('Variáveis MySQL disponíveis:', {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQL_ROOT_PASSWORD
        ? '[DEFINIDA]'
        : '[NÃO DEFINIDA]',
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
    });
  });

module.exports = sequelize;
