const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  try {
    // Cria uma conexão sem especificar o banco de dados
    connection = await mysql.createConnection({
      DATABASE: process.env.DATABASE_URL
    });

    console.log('Conectado ao servidor MySQL');

    // Cria o banco de dados
    await connection.query('CREATE DATABASE IF NOT EXISTS portfolio');
    console.log('Banco de dados criado com sucesso!');

    // Seleciona o banco de dados
    await connection.query('USE portfolio');
    console.log('Banco de dados selecionado');

    // Remove a tabela existente
    await connection.query('DROP TABLE IF EXISTS projects');
    console.log('Tabela antiga removida');

    // Cria a tabela de projetos com os nomes corretos das colunas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        thumbnailUrl VARCHAR(255) NOT NULL,
        repositoryUrl VARCHAR(255) NOT NULL,
        siteUrl VARCHAR(255) NOT NULL,
        technologies JSON NOT NULL,
        description TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Tabela de projetos criada com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexão encerrada');
    }
  }
}

initializeDatabase();
