import { TaskRepository } from '@/infrastructure/TaskRepository';
import { UserRepository } from '@/infrastructure/UserRepository';
import { AuthService } from '@/application/services/AuthService';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';

export class GetTasksService {
  constructor(
    private supabase: ISupabaseClient,
    private taskRepo: ITaskRepository,
    private userRepo: IUserRepository,
  ) {}

  async getTasks(sessionToken: string) {
    try {
      const sessionUser = await this.supabase.auth.getUser(sessionToken);
      const user = await this.userRepo.findById(sessionUser.data.user.id);
      if (!user) throw new Error('ユーザーが見つかりません。');

      return this.taskRepo.findByGroupId(user.groupId);
    } catch {
      throw new Error('タスクの取得に失敗しました。');
    }
  }
}
