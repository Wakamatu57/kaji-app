import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class DeleteTaskService {
  constructor(
    private supabase: ISupabaseClient,
    private taskRepo: ITaskRepository,
  ) {}

  async deleteTask(sessionToken: string, taskId: number) {
    const { data: sessionData, error } = await this.supabase.auth.getUser(sessionToken);
    if (error || !sessionData?.user) throw new Error('Unauthorized');

    return this.taskRepo.delete(taskId);
  }
}
