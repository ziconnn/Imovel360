const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Conexão MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware para verificar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token em falta' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// 🔹 Criar nova oferta (precisa login)
router.post('/create', authenticateToken, (req, res) => {
  const { title, description, price, location, type } = req.body;
  const userId = req.user.id;

  if (!title || !description || !price || !location || !type) {
    return res.status(400).json({ error: 'Preenche todos os campos.' });
  }

  db.query(
    'INSERT INTO offers (user_id, title, description, price, location, type) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, title, description, price, location, type],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar oferta.' });
      }
      res.status(201).json({ message: '✅ Oferta criada com sucesso!', id: result.insertId });
    }
  );
});

// 🔹 Listar todas as ofertas (acessível a todos)
router.get('/', (req, res) => {
  db.query(
    'SELECT offers.*, users.username FROM offers JOIN users ON offers.user_id = users.id',
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar ofertas.' });
      }
      res.json(results);
    }
  );
});

module.exports = router;
