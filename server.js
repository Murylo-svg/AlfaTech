// server.js

// Importa a aplicação configurada do app.js
const app = require('./app');

// Define a porta do servidor. Usa a variável de ambiente PORT ou 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Inicia o servidor e o faz "escutar" por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});