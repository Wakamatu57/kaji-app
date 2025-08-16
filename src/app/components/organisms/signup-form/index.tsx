// components/organisms/SignupForm.tsx
'use client';
import Link from 'next/link';

interface SignupFormProps {
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  groupOption: 'join' | 'create';
  setGroupOption: (v: 'join' | 'create') => void;
  groupName: string;
  setGroupName: (v: string) => void;
  groupPassword: string;
  setGroupPassword: (v: string) => void;
  onSubmit: () => void;
}

export default function SignupForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  groupOption,
  setGroupOption,
  groupName,
  setGroupName,
  groupPassword,
  setGroupPassword,
  onSubmit,
}: SignupFormProps) {
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
          onClick={onSubmit}
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
