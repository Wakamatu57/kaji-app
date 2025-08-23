import { Task } from '../entities/Task';

export interface ITaskRepository {
  findByGroupId(groupId: number): Promise<Task[]>;
  create(userId: string, groupId: number, title: string, category: string): Promise<Task>;
  // update(task: Task): Promise<Task>;
  // delete(taskId: string): Promise<void>;
}
