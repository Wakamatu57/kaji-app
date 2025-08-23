import { Task } from '../entities/Task';

export interface ITaskRepository {
  findByGroupId(groupId: number): Promise<Task[]>;
  create(userId: string, groupId: number, title: string, category: string): Promise<Task>;
  update(taskId: number, title: string, category: string): Promise<Task>;
  delete(taskId: number): Promise<void>;
}
