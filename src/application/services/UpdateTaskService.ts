import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class UpdateTaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async updateTask(taskId: number, title: string, category: string) {
    return this.taskRepo.update(taskId, title, category);
  }
}
