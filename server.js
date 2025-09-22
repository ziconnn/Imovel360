// Carregar variáveis de ambiente
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());
// Rotas de autenticação
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const offersRoutes = require('./routes/offers');
app.use('/offers', offersRoutes);



// Criar ligação à BD
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // CORRIGIDO
  database: process.env.DB_NAME
});

// Testar ligação
db.connect(err => {
  if (err) {
    console.error('❌ Erro a ligar à base de dados:', err);
  } else {
    console.log('✅ Ligação ao MySQL estabelecida');
  }
});

// Rota simples
app.get('/', (req, res) => {
  res.send('🚀 Servidor OeirasPrime está a funcionar!');
});

// Rota para testar ligação ao MySQL
app.get('/testdb', (req, res) => {
  db.query('SELECT NOW() AS agora', (err, results) => {
    if (err) {
      return res.status(500).json({ error: '❌ Erro na query', details: err });
    }
    res.json({ message: '✅ Ligação MySQL OK', hora: results[0].agora });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
