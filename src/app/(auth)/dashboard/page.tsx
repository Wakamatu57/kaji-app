'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardView from '@/components/organisms/dashboard-view';

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
  const [filterMonth, setFilterMonth] = useState<string>('');

  return <DashboardView tasks={tasks} filterMonth={filterMonth} setFilterMonth={setFilterMonth} />;
}
