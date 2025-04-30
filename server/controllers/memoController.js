const db = require('../db');

const memoController = {
    // 메모 생성
    createMemo: async (req, res) => {
        try {
            const { title, content } = req.body;
            const [result] = await db.execute('INSERT INTO memos (title, content) VALUES (?, ?)', [title, content]);
            res.status(201).json({ id: result.insertId, title, content });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 메모 조회
    getMemos: async (req, res) => {
        try {
            const [memos] = await db.execute('SELECT * FROM memos');
            res.json(memos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = memoController;
