import type { Task } from '@/components/organisms/tasks-list';

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white p-4 rounded shadow flex-1 min-w-[200px]">
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p>カテゴリ: {task.category}</p>
      <p>日付: {task.date}</p>
      <p>実施者: {task.userName}</p>
    </div>
  );
}
