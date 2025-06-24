// app.js

const express = require('express');
const dbPromise = require('./db'); // Importa a promessa da conexão com o banco

const app = express();

// Middleware para permitir que o Express entenda requisições com corpo em JSON
app.use(express.json());

// --- ROTAS DA API ---

// Rota principal para testar se o servidor está no ar
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API da Loja de Informática no ar!' });
});

// Rota para listar todos os produtos (GET /produtos)
app.get('/produtos', async (req, res) => {
  try {
    const db = await dbPromise; // Espera a conexão com o banco ficar pronta
    const produtos = await db.all('SELECT * FROM produtos');
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos: ' + error.message });
  }
});

// Rota para buscar um único produto pelo ID (GET /produtos/:id)
app.get('/produtos/:id', async (req, res) => {
    try {
        const db = await dbPromise;
        const { id } = req.params; // Pega o ID da URL
        // Usa um placeholder (?) para evitar SQL Injection
        const produto = await db.get('SELECT * FROM produtos WHERE id = ?', [id]);

        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o produto: ' + error.message });
    }
});


// Rota para cadastrar um novo produto (POST /produtos)
app.post('/produtos', async (req, res) => {
  try {
    const db = await dbPromise;
    const { nome, descricao, preco, estoque } = req.body; // Pega os dados do corpo da requisição

    // Validação simples
    if (!nome || !preco) {
      return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
    }

    // Usa um statement preparado para inserir os dados de forma segura
    const result = await db.run(
      'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
      [nome, descricao, preco, estoque]
    );

    // Retorna o produto recém-criado com seu ID
    res.status(201).json({
      id: result.lastID,
      nome,
      descricao,
      preco,
      estoque
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar produto: ' + error.message });
  }
});


// Exporta o objeto 'app' para que o server.js possa usá-lo
module.exports = app;