'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TasksList from '@/components/organisms/tasks-list';
import type { Task } from '@/components/organisms/tasks-list';
import { useLocalStorage } from '@/hooks/uselocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/lib/localStorageKeys';
import { get } from 'http';
import { getTasks, addTaskApi, updateTask, deleteTask } from '@/services';
import { set } from 'react-hook-form';
import { useLoading } from '@/context/loading-context';

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('料理');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [username, setUsername, removeUsername] = useLocalStorage(LOCAL_STORAGE_KEYS.USERNAME, '');

  const { showLoading, hideLoading } = useLoading();
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
    if (username) {
      setCurrentUser(username);
    }

    fetchTasks();
  }, []);

  const handleDeleteTask = (taskId: number) => {
    showLoading();
    try {
      deleteTask({ taskId });
    } catch (err) {
      console.error('タスク削除失敗', err);
      alert('タスクの削除に失敗しました。');
    } finally {
      hideLoading();
    }

    fetchTasks();
  };

  const handleEditTask = (taskId: number, title: string, category: string) => {
    showLoading();
    try {
      updateTask({ taskId, title, category });
    } catch (err) {
      console.error('タスク更新失敗', err);
      alert('タスクの更新に失敗しました。');
    } finally {
      hideLoading();
    }

    fetchTasks();
  };

  const addTask = (e: React.FormEvent) => {
    showLoading();
    e.preventDefault();
    try {
      addTaskApi({ title: taskName, category });
    } catch (err) {
      console.error('タスク追加失敗', err);
      alert('タスクの追加に失敗しました。');
    } finally {
      hideLoading();
    }

    fetchTasks();
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
