'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Task = {
  id: number;
  name: string;
  category: string;
  date: string; // YYYY-MM-DD
  points: number;
  userName: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: '料理', category: '料理', date: '2025-08-16', points: 2, userName: '太郎' },
    { id: 2, name: '掃除', category: '掃除', date: '2025-08-16', points: 1, userName: '花子' },
    { id: 3, name: '洗濯', category: '洗濯', date: '2025-08-17', points: 3, userName: '太郎' },
    { id: 4, name: '買い物', category: 'その他', date: '2025-08-17', points: 2, userName: '花子' },
  ]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>(''); // YYYY-MM

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/'); // ログインしてない場合はログインページへ
    } else {
      setCurrentUser(username);
    }
  }, [router]);

  if (!currentUser) return null;

  // --- 月フィルタ ---
  const filteredTasks = filterMonth ? tasks.filter((t) => t.date.startsWith(filterMonth)) : tasks;

  // --- ジャンル色設定 ---
  const categoryColors: Record<string, string> = {
    料理: '#4f46e5',
    掃除: '#16a34a',
    洗濯: '#f59e0b',
    買い物: '#ef4444',
    その他: '#9ca3af',
  };

  const categories = Object.keys(categoryColors);

  // --- ユーザーごとのジャンル別ポイント集計 ---
  const users = Array.from(new Set(filteredTasks.map((t) => t.userName)));
  const chartData = users.map((userName) => {
    const userTasks = filteredTasks.filter((t) => t.userName === userName);
    const data: Record<string, any> = { userName };
    userTasks.forEach((t) => {
      const cat = categories.includes(t.category) ? t.category : 'その他';
      data[cat] = (data[cat] || 0) + t.points;
    });
    return data;
  });

  return (
    <main className="p-4 flex flex-col gap-4">
      {/* 月フィルタ */}
      <div className="bg-white p-4 rounded shadow flex gap-2 items-center">
        <label htmlFor="filterMonth">表示月:</label>
        <input
          id="filterMonth"
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => setFilterMonth('')}
        >
          全期間
        </button>
      </div>

      {/* ポイント合計 */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">ユーザーごとの合計ポイント</h2>
        <ul className="mb-4">
          {chartData.map((data) => (
            <li key={data.userName}>
              {data.userName}: {categories.reduce((sum, cat) => sum + (data[cat] || 0), 0)} pt
            </li>
          ))}
        </ul>

        {/* 積み上げ棒グラフ */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="userName" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((cat) => (
              <Bar key={cat} dataKey={cat} stackId="a" fill={categoryColors[cat]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
