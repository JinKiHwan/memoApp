const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
console.log('🔍 현재 사용자:', process.env.DB_USER);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 연결 확인 (선택적)

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL 연결 실패:', err.message);
    } else {
        console.log('✅ MySQL 연결 성공!');
        connection.release();
    }
});
module.exports = pool;
