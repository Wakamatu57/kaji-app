'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/organisms/signup-form';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [groupOption, setGroupOption] = useState<'join' | 'create'>('join');
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const register = async () => {
    // モック処理
    if (!username || !email || !password || !groupName || !groupPassword || !isAgreed) {
      alert('すべて入力してください');
      return;
    }

    setTimeout(() => {
      alert('登録成功！（モック）');
      router.push('/');
    }, 1000);
  };

  return (
    <SignupForm
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      groupOption={groupOption}
      setGroupOption={setGroupOption}
      groupName={groupName}
      setGroupName={setGroupName}
      groupPassword={groupPassword}
      setGroupPassword={setGroupPassword}
      isAgreed={isAgreed}
      setIsAgreed={setIsAgreed}
      onSubmit={register}
    />
  );
}
