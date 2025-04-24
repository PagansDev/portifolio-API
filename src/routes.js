const express = require('express');
const ProjectController = require('./controllers/ProjectController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário (apenas para o dono da aplicação)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - registrationKey
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               registrationKey:
 *                 type: string
 *                 example: "chave-secreta-de-registro"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar usuário
 *       401:
 *         description: Chave de registro inválida
 */
routes.post('/register', AuthController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
routes.post('/login', AuthController.login);

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
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Não autorizado
 */
routes.post('/projects', authMiddleware, ProjectController.store);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto existente
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Não autorizado
 */
routes.put('/projects/:id', authMiddleware, ProjectController.update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Remove um projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Não autorizado
 */
routes.delete('/projects/:id', authMiddleware, ProjectController.destroy);

module.exports = routes;
