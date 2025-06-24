// db.js

// Importa os pacotes necessários
const sqlite3 = require('sqlite3').verbose(); // O driver do banco de dados
const { open } = require('sqlite');           // A biblioteca para abrir a conexão de forma assíncrona

// Função assíncrona para configurar e conectar ao banco de dados
async function setupDatabase() {
  // Abre a conexão com o banco de dados. Se o arquivo não existir, ele será criado.
  const db = await open({
    filename: './seu_banco.sqlite', // Nome do arquivo do banco de dados
    driver: sqlite3.Database
  });

  // Executa um comando SQL para criar a tabela 'produtos' se ela ainda não existir.
  // Isso garante que a estrutura do banco esteja sempre pronta.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      estoque INTEGER DEFAULT 0
    )
  `);

  console.log('Banco de dados conectado e tabela de produtos garantida.');

  // Retorna a instância do banco de dados para ser usada em outras partes da aplicação
  return db;
}

// Exportamos a instância do banco de dados que será retornada pela função
module.exports = setupDatabase();