const express = require('express');
const ProjectController = require('./controllers/ProjectController');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
routes.post('/register', UserController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Realiza login do usuário
 *     description: Autentica o usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
routes.post('/login', UserController.login);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Lista todos os projetos
 *     description: Retorna uma lista de todos os projetos
 *     responses:
 *       200:
 *         description: Lista de projetos
 *   post:
 *     tags:
 *       - Projects
 *     summary: Cria um novo projeto
 *     description: Cria um novo projeto (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.get('/projects', ProjectController.index);
routes.post('/projects', authMiddleware, ProjectController.store);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtém um projeto específico
 *     description: Retorna os detalhes de um projeto específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do projeto
 *       404:
 *         description: Projeto não encontrado
 *   put:
 *     tags:
 *       - Projects
 *     summary: Atualiza um projeto
 *     description: Atualiza um projeto existente (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Projeto não encontrado
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Remove um projeto
 *     description: Remove um projeto existente (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Projeto removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Projeto não encontrado
 */
routes.get('/projects/:id', ProjectController.show);
routes.put('/projects/:id', authMiddleware, ProjectController.update);
routes.delete('/projects/:id', authMiddleware, ProjectController.destroy);

module.exports = routes;
