const db = require('../db');

const memoModel = {
    // 메모 테이블 생성
    createTable: async () => {
        try {
            await db.execute(`
        CREATE TABLE IF NOT EXISTS memos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
            console.log('메모 테이블이 생성되었습니다.');
        } catch (error) {
            console.error('테이블 생성 중 오류 발생:', error);
        }
    },
};

module.exports = memoModel;
