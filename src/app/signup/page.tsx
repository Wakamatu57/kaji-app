'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/organisms/signup-form';

export default function SignupPage() {
  const router = useRouter();
  const register = async () => {
    setTimeout(() => {
      alert('登録成功！（モック）');
      router.push('/');
    }, 1000);
  };

  return <SignupForm onSubmit={register} />;
}
