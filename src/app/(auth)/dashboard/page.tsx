'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardView from '@/components/organisms/dashboard-view';
import { useLoading } from '@/context/loading-context';
import { getTasks } from '@/services';
import { Task } from '@/components/organisms/tasks-list';

export default function DashboardPage() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      showLoading();
      const tasks: Task[] = await getTasks();
      setTasks(tasks);
    } catch (err) {
      console.error('タスク取得失敗', err);
      alert('タスクの取得に失敗しました。');
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [filterMonth, setFilterMonth] = useState<string>('');

  return <DashboardView tasks={tasks} filterMonth={filterMonth} setFilterMonth={setFilterMonth} />;
}
