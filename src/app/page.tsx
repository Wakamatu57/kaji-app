'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/organisms/login-form';
import { useLoading } from '@/context/loading-context';
import { LOCAL_STORAGE_KEYS } from '@/lib/localStorageKeys';
import { useLocalStorage } from '@/hooks/uselocalStorage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { showLoading, hideLoading } = useLoading();

  const [username, setUsername, removeUsername] = useLocalStorage(LOCAL_STORAGE_KEYS.USERNAME, '');
  const [usermail, setUsermail, removeUsermail] = useLocalStorage(LOCAL_STORAGE_KEYS.USERMAIL, '');

  const login = async () => {
    showLoading();
    if (!email || !password) {
      setErrorMsg('メールアドレスとパスワードを入力してください');
      hideLoading();
      return;
    }

    // Todo: ここでサーバーにログインリクエストを送る処理を実装する
    setTimeout(() => {
      setUsername('ゲスト');
      setUsermail(email);
      router.push('/tasks');
      hideLoading();
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
