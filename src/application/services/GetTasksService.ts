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

  async getTasks(userId: string, accessToken: string) {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) throw new Error('ユーザーが見つかりません。');

      // 同じグループに属するユーザー一覧を取得
      const groupUsers = await this.userRepo.findByGroupId(user.groupId);
      const userIds = groupUsers.map((u) => u.userId);

      // ユーザーID一覧からタスク取得
      return this.taskRepo.findByUserIds(userIds);
    } catch {
      throw new Error('タスクの取得に失敗しました。');
    }
  }
}
