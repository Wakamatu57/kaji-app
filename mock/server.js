const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;

const corsOptions = {
  origin: 'http://localhost:3000', // フロントのオリジン
  credentials: true, // Cookie を許可
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// ------------------------
// Auth Routes
// ------------------------

// ログイン
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // 簡易チェック
  if (!email || !password) return res.status(400).json({ error: 'メールとパスワード必須' });

  // セッションをヘッダで返す
  res.setHeader('Set-Cookie', 'session=abcdef123456; Path=/; SameSite=Strict');

  // ボディには username だけ返す
  res.status(200).json({ username: 'テストユーザー' });
});

// サインアップ
app.post('/api/auth/signup', (req, res) => {
  res.status(201).json({});
});

// ログアウト
app.post('api//auth/logout', (req, res) => {
  res.status(204).send();
});

// ------------------------
// Task Routes
// ------------------------

// タスク一覧取得
app.get('/api/tasks', (req, res) => {
  res.status(200).json([
    {
      taskId: '1',
      title: '皿洗い',
      category: 'その他',
      date: '2025-08-18',
      userName: 'たろう',
    },
    {
      taskId: '2',
      title: '買い物',
      category: '買い物',
      date: '2025-08-19',
      userName: 'じろう',
    },
    {
      taskId: '3',
      title: '掃除',
      category: '掃除',
      date: '2025-08-20',
      userName: 'はなこ',
    },
  ]);
});

// タスク追加
app.post('/api/tasks', (req, res) => {
  res.status(201).json({});
});

// タスク更新
app.post('/api/tasks/update', (req, res) => {
  res.status(200).json({});
  // res.status(500).json({ error: 'タスク更新はサポートされていません' });
});

// タスク削除
app.post('/api/tasks/delete', (req, res) => {
  res.status(200).json({});
  // res.status(500).json({ error: 'タスク削除はサポートされていません' });
});

// ------------------------
// サーバー起動
// ------------------------
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
