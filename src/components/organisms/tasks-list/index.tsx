'use client';

import { TaskCard } from '../../molecules/task-card';

export type Task = {
  taskId: number;
  title: string;
  category: string;
  date: string;
  userName: string;
};

interface TasksListProps {
  tasks: Task[];
  taskName: string;
  setTaskName: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  onAddTask: (e: React.FormEvent) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, name: string, category: string) => void;
}

export default function TasksList({
  tasks,
  taskName,
  setTaskName,
  category,
  setCategory,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: TasksListProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* タスク追加フォーム */}
      <form className="flex flex-wrap gap-2 bg-white p-4 rounded shadow" onSubmit={onAddTask}>
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
          <option>その他</option>
        </select>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          追加
        </button>
      </form>

      {/* タスク一覧 */}
      <div className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <TaskCard
            task={task}
            key={task.taskId}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </div>
  );
}
