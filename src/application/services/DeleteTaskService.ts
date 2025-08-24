import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class DeleteTaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async deleteTask(taskId: number) {
    return this.taskRepo.delete(taskId);
  }
}
