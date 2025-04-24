const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      if (await User.findOne({ where: { username } })) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({ username, password });

      return res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
        },
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      return res.json({
        user: {
          id: user.id,
          username: user.username,
        },
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao fazer login' });
    }
  }
}

module.exports = new AuthController();
