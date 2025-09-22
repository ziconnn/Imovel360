const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();

const router = express.Router();

// Conexão MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 🔹 Registo de utilizador
router.post('/register', async (req, res) => {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Preenche todos os campos obrigatórios.' });
  }

  try {
    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, phone],
      (err, result) => {
        if (err) {
          console.error("❌ Erro MySQL no registo:", err); // <-- LOG DETALHADO
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email ou username já existem.' });
          }
          return res.status(500).json({ error: 'Erro ao registar utilizador.' });
        }
        console.log("✅ Utilizador registado com sucesso:", { id: result.insertId, username, email });
        res.status(201).json({ message: '✅ Utilizador registado com sucesso!' });
      }
    );
  } catch (error) {
    console.error("❌ Erro interno no registo:", error); // <-- LOG DETALHADO
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// 🔹 Login de utilizador
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password são obrigatórios.' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error("❌ Erro MySQL no login:", err); // <-- LOG DETALHADO
      return res.status(500).json({ error: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const user = results[0];

    // Comparar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas.' });

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login bem-sucedido:", { id: user.id, email: user.email });
    res.json({
      message: '✅ Login efetuado com sucesso!',
      token
    });
  });
});

module.exports = router;
