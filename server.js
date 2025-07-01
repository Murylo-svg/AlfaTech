// index.js

// 1. Importações e Configuração Inicial
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// 2. Inicialização do Servidor Express
const app = express();
const PORT = 3000; // A porta em que nosso servidor vai rodar

// 3. Conexão com o Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 4. Middlewares
app.use(cors()); // Permite que outros domínios (seu site) acessem esta API
app.use(express.json()); // Permite que o servidor entenda JSON enviado no corpo das requisições

// 5. Definição das Rotas (Endpoints da nossa API)

// Rota de teste para ver se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor da AlfaTech está no ar!');
});

// --- ROTAS PARA PRODUTOS ---

// Rota para BUSCAR TODOS os produtos
app.get('/produtos', async (req, res) => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

// Rota para CRIAR um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, estoque, imagem_url } = req.body;

  // Validação simples
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, descricao, preco, estoque, imagem_url }])
    .select(); // .select() retorna o objeto criado

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]); // 201 = Created (Criado com sucesso)
});

// Rota para DELETAR um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id); // Deleta onde a coluna 'id' for igual ao ID recebido

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: `Produto com ID ${id} deletado com sucesso.` });
});


// 6. Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${3000}`);
});