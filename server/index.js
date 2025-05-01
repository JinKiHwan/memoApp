// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const db = require('./db'); // 연결 테스트를 위해 호출만
const usersRouter = require('./routes/users'); // ✅ 추가
const memoRoutes = require('./routes/memoRoutes');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json()); // ✅ JSON 파싱
app.use('/users', usersRouter); // ✅ 라우터 등록
app.use('/memos', memoRoutes);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('📝 Memo App Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중 (포트 ${PORT})`);
});
