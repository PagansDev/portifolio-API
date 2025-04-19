const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  // Usa as variáveis do Railway MySQL
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'railway',
    process.env.MYSQLUSER || 'root',
    process.env.MYSQL_ROOT_PASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT || 3306,
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
    console.log('Variáveis de ambiente disponíveis:', {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQLUSER,
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
    });
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
    console.error('Detalhes da configuração:', {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQLUSER,
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
    });
  });

module.exports = sequelize;
