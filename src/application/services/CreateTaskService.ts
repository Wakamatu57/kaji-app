import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';

export class CreateTaskService {
  constructor(
    private supabase: ISupabaseClient,
    private taskRepo: ITaskRepository,
    private userRepo: IUserRepository,
  ) {}

  async createTask(sessionToken: string, title: string, category: string): Promise<Task> {
    const sessionUser = await this.supabase.auth.getUser(sessionToken);
    if (!sessionUser.data || !sessionUser.data.user) {
      throw new Error('ユーザー情報が取得できませんでした。');
    }
    const user = await this.userRepo.findById(sessionUser.data.user.id);
    if (!user) throw new Error('ユーザーが見つかりません');

    const date = new Date().toISOString().split('T')[0];
    return this.taskRepo.create(user.userId, title, category, date);
  }
}
