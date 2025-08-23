import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class UpdateTaskService {
  constructor(
    private supabase: ISupabaseClient,
    private taskRepo: ITaskRepository,
  ) {}

  async updateTask(sessionToken: string, taskId: number, title: string, category: string) {
    const { data: sessionData, error } = await this.supabase.auth.getUser(sessionToken);
    if (error || !sessionData?.user) throw new Error('Unauthorized');

    return this.taskRepo.update(taskId, title, category);
  }
}
