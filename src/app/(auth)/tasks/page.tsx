'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TasksList from '@/components/organisms/tasks-list';
import type { Task } from '@/components/organisms/tasks-list';
import { useLocalStorage } from '@/hooks/uselocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/lib/localStorageKeys';
import { get } from 'http';
import { getTasks } from '@/services';
import { set } from 'react-hook-form';

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('料理');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [username, setUsername, removeUsername] = useLocalStorage(LOCAL_STORAGE_KEYS.USERNAME, '');

  useEffect(() => {
    if (username) {
      setCurrentUser(username);
    }
    const fetchTasks = async () => {
      try {
        const tasks: Task[] = await getTasks();
        setTasks(tasks);
      } catch (err) {
        console.error('タスク取得失敗', err);
        alert('タスクの取得に失敗しました。');
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = (id: number) => {
    // setTasks(tasks.filter((task) => task.id !== id));
    // ToDo ここでサーバーに削除リクエストを送る
  };
  const handleEditTask = (id: number, name: string, category: string) => {
    // setTasks(tasks.map((task) => (task.id === id ? { ...task, name, category } : task)));
    // ToDo ここでサーバーに更新リクエストを送る
  };

  const addTask = (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!currentUser) return;
    // const newTask: Task = {
    //   id: tasks.length + 1,
    //   name: taskName,
    //   category,
    //   date: new Date().toISOString().split('T')[0],
    //   userName: currentUser,
    // };
    // setTasks([...tasks, newTask]);
    // // ToDo ここでサーバーに追加リクエストを送る
    // setTaskName('');
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
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
    />
  );
}
