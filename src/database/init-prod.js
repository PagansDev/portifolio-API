const sequelize = require('../config/database');
const Project = require('../models/Project');

async function initializeDatabase() {
  try {
    // Sincroniza o modelo com o banco de dados
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;
