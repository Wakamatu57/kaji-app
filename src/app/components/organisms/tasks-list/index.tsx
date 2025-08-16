'use client';

export type Task = {
  id: number;
  name: string;
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
}

export default function TasksList({
  tasks,
  taskName,
  setTaskName,
  category,
  setCategory,
  onAddTask,
}: TasksListProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-4">
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
          <div key={task.id} className="bg-white p-4 rounded shadow flex-1 min-w-[200px]">
            <h3 className="text-lg font-bold">{task.name}</h3>
            <p>カテゴリ: {task.category}</p>
            <p>日付: {task.date}</p>
            <p>実施者: {task.userName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
