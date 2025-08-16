'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/organisms/login-form';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async () => {
    if (!email || !password) {
      setErrorMsg('メールアドレスとパスワードを入力してください');
      return;
    }

    // モック処理
    setTimeout(() => {
      localStorage.setItem('username', email);
      router.push('/tasks');
    }, 1000);
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorMsg={errorMsg}
      onSubmit={login}
    />
  );
}
