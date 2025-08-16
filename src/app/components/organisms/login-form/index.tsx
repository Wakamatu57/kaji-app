// components/organisms/LoginForm.tsx
'use client';
import Link from 'next/link';

interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  errorMsg: string;
  onSubmit: () => void;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  errorMsg,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow flex flex-col gap-4 w-4/5 max-w-md">
        <h1 className="text-2xl font-bold">ログイン</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <button onClick={onSubmit} className="bg-indigo-600 text-white px-4 py-3 rounded">
          ログイン
        </button>
        <p className="text-center text-gray-600">
          新規登録は{' '}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
}
