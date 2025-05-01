// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// 회원가입
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '필수 입력값 누락' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'DB 오류' });
      res.status(201).json({ message: '회원가입 성공', userId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: '암호화 실패' });
  }
});

// server/routes/auth.js 추가
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '필수 입력값 누락' });

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB 오류' });
    if (results.length === 0) return res.status(401).json({ error: '존재하지 않는 사용자' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '비밀번호 불일치' });

    res.status(200).json({ message: '로그인 성공', userId: user.id });
  });
});

module.exports = router;
