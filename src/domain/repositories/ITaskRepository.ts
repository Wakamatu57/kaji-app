import { Task } from '../entities/Task';

export interface ITaskRepository {
  findByGroupId(groupId: number): Promise<Task[]>;
  //   create(task: Task): Promise<Task>;
  //   update(task: Task): Promise<Task>;
  //   delete(taskId: string): Promise<void>;
}
