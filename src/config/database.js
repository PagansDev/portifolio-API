const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se está em produção
if (process.env.NODE_ENV === 'production') {
  // Usa a URL do MySQL do Railway
  const mysqlUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;

  if (!mysqlUrl) {
    console.error('URL do MySQL não encontrada nas variáveis de ambiente!');
    console.error('Variáveis disponíveis:', process.env);
    throw new Error('URL do MySQL não configurada');
  }

  console.log('Tentando conectar ao MySQL com URL:', mysqlUrl);

  sequelize = new Sequelize(mysqlUrl, {
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
    console.error('Variáveis MySQL disponíveis:', {
      url: process.env.MYSQL_URL,
      publicUrl: process.env.MYSQL_PUBLIC_URL,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQLUSER,
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
    });
  });

module.exports = sequelize;
