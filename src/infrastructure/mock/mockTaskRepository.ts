// infra/repositories/MockTaskRepository.ts
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';

export class MockTaskRepository implements ITaskRepository {
  private tasks: Task[] = [
    new Task(1, '掃除', '家事', '2025-08-07', '太郎'),
    new Task(2, '買い物', '買い物', '2025-08-07', '花子'),
  ];

  async findByGroupId(groupId: number): Promise<Task[]> {
    // グループごとの絞り込みは無視して全タスク返す（モックなので）
    console.log('tasks', this.tasks);
    return this.tasks;
  }

  async create(userId: string, groupId: number, title: string, category: string): Promise<Task> {
    const task = new Task(
      this.tasks.length + 1,
      title,
      category,
      new Date().toISOString().split('T')[0],
      `testuser`,
    );
    this.tasks.push(task);
    console.log('this.tasks', this.tasks);
    return task;
  }

  async update(taskId: number, title: string, category: string): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.taskId === taskId);
    if (index === -1) throw new Error('Task not found');
    const addedTask = new Task(
      taskId,
      title,
      category,
      this.tasks[index].date,
      this.tasks[index].userName,
    );
    this.tasks[index] = addedTask;
    return addedTask;
  }

  async delete(taskId: number): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.taskId !== taskId);
  }
}
