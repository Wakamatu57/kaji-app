'use client';

import Sidebar from '@/components/organisms/sidebar';
import Header from '@/components/organisms/header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser(username);
    } else {
      // ログインしていない場合はログインページへリダイレクト
      router.push('/login');
    }
  }, []);
  return (
    <>
      <Header userName={currentUser || ''} />
      <div className="flex bg-gray-100" style={{ height: 'calc(100vh - 80px)' }}>
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </>
  );
}
