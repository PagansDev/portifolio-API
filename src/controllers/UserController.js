const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({ name, email, password });

      user.password_hash = undefined;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: 'Falha no registro' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Falha na autenticação' });
    }
  }
}

module.exports = new UserController();
