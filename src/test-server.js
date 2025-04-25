const express = require('express');
const app = express();

// Healthcheck endpoint
app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

// Rota básica
app.get('/', (_, res) => {
  res.json({ message: 'API funcionando' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor de teste rodando na porta ${port}`);
});
