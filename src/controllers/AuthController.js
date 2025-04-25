const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    try {
      const { username, password, registrationKey } = req.body;

      // Verifica se a chave de registro está correta
      if (registrationKey !== process.env.REGISTRATION_KEY) {
        return res.status(401).json({ error: 'Chave de registro inválida' });
      }

      // Verifica se o usuário já existe
      const userExists = await User.findOne({ where: { username } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      // Cria o usuário (o hash da senha é feito automaticamente pelo modelo)
      const user = await User.create({
        username,
        password,
      });

      return res
        .status(201)
        .json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Busca o usuário
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verifica a senha usando o método do modelo
      const validPassword = await user.checkPassword(password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gera o token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao fazer login' });
    }
  },
};
