const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Pega o header de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Token não fornecido',
        message:
          'Adicione o header Authorization com o formato: Bearer seu-token-aqui',
      });
    }

    // Remove espaços extras e divide
    const parts = authHeader.trim().split(' ');

    // Se enviou só o token, adiciona o Bearer
    if (parts.length === 1) {
      parts.unshift('Bearer');
    }

    if (parts.length !== 2) {
      return res.status(401).json({
        error: 'Token mal formatado',
        message: 'O token deve estar no formato: Bearer seu-token-aqui',
      });
    }

    const [scheme, token] = parts;

    // Verifica se começa com Bearer (case insensitive)
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: 'Token mal formatado',
        message: 'O prefixo deve ser "Bearer". Exemplo: Bearer seu-token-aqui',
      });
    }

    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Token inválido',
        message:
          'O token fornecido é inválido ou expirou. Faça login novamente.',
      });
    }

    return res.status(500).json({
      error: 'Erro interno',
      message: 'Erro ao processar a autenticação',
    });
  }
};
