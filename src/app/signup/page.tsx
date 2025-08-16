'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [groupOption, setGroupOption] = useState<'join' | 'create'>('join');
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const register = async () => {
    // バリデーション簡略
    if (!username || !email || !password || !groupName || !groupPassword) {
      alert('すべて入力してください');
      return;
    }

    // API叩いてユーザー作成・グループ作成 or 参加
    // const res = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, email, password, groupOption, groupName, groupPassword }),
    // });

    // const data = await res.json();
    // if (res.ok) {
    //   router.push('/login');
    // } else {
    //   alert(data.message || '登録失敗');
    // }

    setTimeout(() => {
      alert('登録成功！（モック）');
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">新規登録</h1>

        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="join"
              checked={groupOption === 'join'}
              onChange={() => setGroupOption('join')}
            />
            既存グループに参加
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="create"
              checked={groupOption === 'create'}
              onChange={() => setGroupOption('create')}
            />
            新規グループ作成
          </label>
        </div>

        <input
          type="text"
          placeholder={groupOption === 'join' ? 'グループ名' : '新規グループ名'}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="グループの合言葉"
          value={groupPassword}
          onChange={(e) => setGroupPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={register}
          className="bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700"
        >
          登録
        </button>
        <div className="text-sm text-center mt-4">
          <span>すでにアカウントをお持ちですか？ </span>
          <Link href="/" className="text-indigo-600 hover:underline">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
