'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocalStorage } from '../../../hooks/uselocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../../lib/localStorageKeys';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername, removeUsername] = useLocalStorage(LOCAL_STORAGE_KEYS.USERNAME, '');
  const [usermail, setUsermail, removeUsermail] = useLocalStorage(LOCAL_STORAGE_KEYS.USERMAIL, '');

  const handleLogout = () => {
    removeUsername();
    removeUsermail();
    router.push('/');
  };

  return (
    <>
      {/* モバイルハンバーガー */}
      <button
        className="md:hidden fixed top-4 left-0 z-50 bg-gray-700 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* サイドバー */}
      <div
        className={`
          fixed top-0 left-0 bg-gray-200 text-gray-800 z-50 transform transition-transform
          w-60 h-screen md:h-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md: flex md: flex-col
        `}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 md:justify-center md:flex-col">
          <span className="font-bold text-lg mb-2 md:mb-4">家事アピール帳</span>
          <button className="md:hidden text-gray-800" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {/* ナビリンク */}
        <nav className="flex flex-col flex-1 mt-4 gap-2 px-2">
          <Link
            href="/tasks"
            className={`px-4 py-2 rounded hover:bg-gray-300 ${
              pathname === '/tasks' ? 'bg-gray-500 text-white' : 'text-gray-800'
            }`}
          >
            タスク一覧
          </Link>
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded hover:bg-gray-300 ${
              pathname === '/dashboard' ? 'bg-gray-500 text-white' : 'text-gray-800'
            }`}
          >
            ダッシュボード
          </Link>
          <div className="flex-1" /> {/* 下まで伸ばす用 */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded mt-auto text-white"
          >
            ログアウト
          </button>
        </nav>
      </div>
    </>
  );
}
