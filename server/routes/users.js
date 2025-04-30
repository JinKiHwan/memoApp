const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required.' });

    const query = 'INSERT INTO users (username) VALUES (?)';
    db.query(query, [username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.status(201).json({ message: '사용자 등록 성공', userId: result.insertId });
    });
});

module.exports = router;
