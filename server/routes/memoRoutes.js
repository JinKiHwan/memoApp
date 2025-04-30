const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /memos : 메모 등록
router.post('/', (req, res) => {
    const { user_id, content } = req.body;

    if (!user_id || !content) {
        return res.status(400).json({ error: 'user_id와 content는 필수입니다.' });
    }

    const query = 'INSERT INTO memos (user_id, content) VALUES (?, ?)';
    db.query(query, [user_id, content], (err, result) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(500).json({ error: 'DB 오류' });
        }
        res.status(201).json({ message: '메모 등록 성공', memoId: result.insertId });
    });
});

// GET /memos : 전체 메모 조회
router.get('/', (req, res) => {
    const query = `
    SELECT memos.id, memos.content, memos.created_at, users.username
    FROM memos
    JOIN users ON memos.user_id = users.id
    ORDER BY memos.created_at DESC
  `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ 메모 조회 실패:', err);
            return res.status(500).json({ error: 'DB 오류' });
        }

        res.status(200).json({ memos: results });
    });
});

module.exports = router;
