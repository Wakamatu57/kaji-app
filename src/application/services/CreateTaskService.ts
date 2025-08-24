import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';
import { createJSTDate } from '@/utils/date';

export class CreateTaskService {
  constructor(
    private supabase: ISupabaseClient,
    private taskRepo: ITaskRepository,
    private userRepo: IUserRepository,
  ) {}

  async createTask(userId: string, title: string, category: string): Promise<Task> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('ユーザーが見つかりません');

    const date = createJSTDate();
    return this.taskRepo.create(user.userId, title, category, date);
  }
}
