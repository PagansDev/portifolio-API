const Project = require('../models/Project');

const ProjectController = {
  // Listar todos os projetos
  async index(req, res) {
    try {
      const projects = await Project.findAll();
      return res.json(projects);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
  },

  // Buscar um projeto específico
  async show(req, res) {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }
      return res.json(project);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      return res.status(500).json({ error: 'Erro ao buscar projeto' });
    }
  },

  // Criar um novo projeto
  async store(req, res) {
    try {
      // Removendo o id, createdAt e updatedAt do corpo da requisição
      const { id, createdAt, updatedAt, ...projectData } = req.body;
      const project = await Project.create(projectData);
      return res.status(201).json(project);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      return res.status(400).json({
        error: 'Erro ao criar projeto',
        details: error.message,
      });
    }
  },

  // Atualizar um projeto
  async update(req, res) {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }
      // Removendo o id, createdAt e updatedAt do corpo da requisição
      const { id, createdAt, updatedAt, ...projectData } = req.body;
      await project.update(projectData);
      return res.json(project);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      return res.status(400).json({
        error: 'Erro ao atualizar projeto',
        details: error.message,
      });
    }
  },

  // Deletar um projeto
  async destroy(req, res) {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }
      await project.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      return res.status(400).json({
        error: 'Erro ao deletar projeto',
        details: error.message,
      });
    }
  },
};

module.exports = ProjectController;
