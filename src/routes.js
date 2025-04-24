const express = require('express');
const ProjectController = require('./controllers/ProjectController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.post('/projects', authMiddleware, ProjectController.store);
routes.put('/projects/:id', authMiddleware, ProjectController.update);
routes.delete('/projects/:id', authMiddleware, ProjectController.destroy);

module.exports = routes;
