'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TasksList from '@/components/organisms/tasks-list';
import type { Task } from '@/components/organisms/tasks-list';

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: '料理', category: '料理', date: '2025-08-16', userName: '太郎' },
    { id: 2, name: '掃除', category: '掃除', date: '2025-08-16', userName: '花子' },
  ]);
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('料理');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
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
      userName: currentUser,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  if (!currentUser) return null;

  return (
    <TasksList
      tasks={tasks}
      taskName={taskName}
      setTaskName={setTaskName}
      category={category}
      setCategory={setCategory}
      onAddTask={addTask}
    />
  );
}
