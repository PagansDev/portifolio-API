const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  // Usa a URL de conexão do Railway
  sequelize = new Sequelize(process.env.MYSQL_URL || process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
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

module.exports = sequelize;
