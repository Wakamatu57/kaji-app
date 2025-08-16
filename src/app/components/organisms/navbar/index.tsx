'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-700 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">家事アピール帳</div>
      <div className="flex gap-4 items-center">
        <Link
          href="/dashboard"
          className={`px-3 py-1 rounded ${pathname === '/dashboard' ? 'bg-indigo-800' : 'hover:bg-indigo-500'}`}
        >
          ダッシュボード
        </Link>
        <Link
          href="/tasks"
          className={`px-3 py-1 rounded ${pathname === '/tasks' ? 'bg-indigo-800' : 'hover:bg-indigo-500'}`}
        >
          タスク一覧
        </Link>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded">
          ログアウト
        </button>
      </div>
    </nav>
  );
}
