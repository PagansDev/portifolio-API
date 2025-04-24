const express = require('express');
const ProjectController = require('./controllers/ProjectController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registra um novo usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *             - registrationKey
 *           properties:
 *             username:
 *               type: string
 *               example: "usuario"
 *             password:
 *               type: string
 *               example: "senha123"
 *             registrationKey:
 *               type: string
 *               example: "chave-secreta"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar usuário
 */
routes.post('/register', AuthController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Autentica um usuário
 *     parameters:
 *       - in: body
 *         name: credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               example: "usuario"
 *             password:
 *               type: string
 *               example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       401:
 *         description: Credenciais inválidas
 */
routes.post('/login', AuthController.login);

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Lista todos os projetos
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Project'
 */
routes.get('/projects', ProjectController.index);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Busca um projeto específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *         schema:
 *           $ref: '#/definitions/Project'
 *       404:
 *         description: Projeto não encontrado
 */
routes.get('/projects/:id', ProjectController.show);

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Cria um novo projeto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: project
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProjectInput'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *         schema:
 *           $ref: '#/definitions/Project'
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
 *     tags:
 *       - Projects
 *     summary: Atualiza um projeto existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID do projeto
 *       - in: body
 *         name: project
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProjectInput'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *         schema:
 *           $ref: '#/definitions/Project'
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
 *     tags:
 *       - Projects
 *     summary: Remove um projeto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
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
