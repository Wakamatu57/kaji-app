import { Task } from '../entities/Task';

export interface ITaskRepository {
  findByUserIds(userIds: string[]): Promise<Task[]>;
  create(userId: string, title: string, category: string, date: string): Promise<Task>;
  update(taskId: number, title: string, category: string): Promise<Task>;
  delete(taskId: number): Promise<void>;
}
