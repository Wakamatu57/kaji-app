'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  name: string;
  category: string;
  date: string;
  points: number;
  userName: string;
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: '料理', category: '料理', date: '2025-08-16', points: 2, userName: '太郎' },
    { id: 2, name: '掃除', category: '掃除', date: '2025-08-16', points: 1, userName: '花子' },
  ]);
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('料理');
  const [points, setPoints] = useState(1);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/'); // ログインしてない場合はログインページへ
    } else {
      setCurrentUser(username);
    }
  }, [router]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newTask: Task = {
      id: tasks.length + 1,
      name: taskName,
      category,
      date: new Date().toISOString().split('T')[0],
      points,
      userName: currentUser,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setPoints(1);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4 flex flex-col gap-4">
        {/* タスク追加フォーム */}
        <form className="flex flex-wrap gap-2 bg-white p-4 rounded shadow" onSubmit={addTask}>
          <input
            type="text"
            placeholder="家事内容"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[150px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option>料理</option>
            <option>掃除</option>
            <option>洗濯</option>
            <option>買い物</option>
          </select>
          <input
            type="number"
            min={1}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            追加
          </button>
        </form>

        {/* タスク一覧 */}
        <div className="flex flex-wrap gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow flex-1 min-w-[200px]">
              <h3 className="text-lg font-bold">{task.name}</h3>
              <p>カテゴリ: {task.category}</p>
              <p>日付: {task.date}</p>
              <p>ポイント: {task.points}</p>
              <p>実施者: {task.userName}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
