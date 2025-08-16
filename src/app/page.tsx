'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const login = async () => {
    if (!email || !password) {
      setErrorMsg('メールアドレスとパスワードを入力してください');
      return;
    }
    // const res = await fetch('/api/auth/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();
    // if (res.ok) {
    //   localStorage.setItem('username', data.user.email);
    //   router.push('/dashboard');
    // } else {
    //   setErrorMsg(data.error);
    // }
    setTimeout(() => {
      // 成功した場合の処理
      localStorage.setItem('username', email);
      router.push('/tasks');
    }, 1000);
  };

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
        <button onClick={login} className="bg-indigo-600 text-white px-4 py-3 rounded">
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
