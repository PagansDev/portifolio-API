-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS portfolio;

-- Seleciona o banco de dados
USE portfolio;

-- Criação da tabela de projetos
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 