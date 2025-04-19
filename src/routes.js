const express = require('express');
const ProjectController = require('./controllers/ProjectController');

const routes = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
routes.get('/projects', ProjectController.index);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Busca um projeto específico
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Projeto não encontrado
 */
routes.get('/projects/:id', ProjectController.show);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Erro na criação do projeto
 */
routes.post('/projects', ProjectController.store);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto existente
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Projeto não encontrado
 */
routes.put('/projects/:id', ProjectController.update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Remove um projeto
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     responses:
 *       204:
 *         description: Projeto removido com sucesso
 *       404:
 *         description: Projeto não encontrado
 */
routes.delete('/projects/:id', ProjectController.destroy);

module.exports = routes;
