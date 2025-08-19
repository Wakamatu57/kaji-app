import { useState } from 'react';
import type { Task } from '../../organisms/tasks-list';

interface TaskCardProps {
  task: Task;
  onEditTask: (id: number, name: string, category: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskCard({ task, onEditTask, onDeleteTask }: TaskCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editName, setEditName] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditTask(task.taskId, editName, editCategory);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.taskId);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow flex-1 min-w-[200px]">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>カテゴリ: {task.category}</p>
        <p>日付: {task.date}</p>
        <p>実施者: {task.userName}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            編集
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            削除
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xs">
            <h2 className="text-lg font-bold mb-4">家事編集</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="家事内容"
                className="border p-2 rounded"
                required
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="料理">料理</option>
                <option value="掃除">掃除</option>
                <option value="洗濯">洗濯</option>
                <option value="買い物">買い物</option>
                <option value="その他">その他</option>
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                >
                  キャンセル
                </button>
                <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xs">
            <h2 className="text-lg font-bold mb-4 text-red-600">削除確認</h2>
            <p className="mb-4">「{task.title}」を削除しますか？この操作は元に戻せません。</p>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
