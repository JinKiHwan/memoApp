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

// PUT /memos/:id - 메모 수정
router.put('/:id', (req, res) => {
  const memoId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: '수정할 content가 필요합니다.' });
  }

  const query = 'UPDATE memos SET content = ? WHERE id = ?';
  db.query(query, [content, memoId], (err, result) => {
    if (err) {
      console.error('❌ 메모 수정 실패:', err);
      return res.status(500).json({ error: 'DB 오류' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '해당 메모를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '메모 수정 성공' });
  });
});

// DELETE /memos/:id - 메모 삭제
router.delete('/:id', (req, res) => {
  const memoId = req.params.id;

  const query = 'DELETE FROM memos WHERE id = ?';
  db.query(query, [memoId], (err, result) => {
    if (err) {
      console.error('❌ 메모 삭제 실패:', err);
      return res.status(500).json({ error: 'DB 오류' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '삭제할 메모를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '메모 삭제 성공' });
  });
});

module.exports = router;
