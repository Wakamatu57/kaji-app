import { IGroupRepository } from '@/domain/repositories/IGroupRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { EmailAlreadyExistsError } from '@/utils/errors/EmailAlreadyExistsError';
import { GroupAlreadyExistsError } from '@/utils/errors/GroupAlreadyExistsError';
import { GroupNotFoundError } from '@/utils/errors/GroupNotFoundError';

export class SignupService {
  constructor(
    private supabase: ISupabaseClient,
    private groupRepo: IGroupRepository,
    private userRepo: IUserRepository,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
    groupOption: 'create' | 'join',
    groupName: string,
    groupPassword: string,
  ) {
    const { data: authUser, error: authError } = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authError || !authUser?.user) {
      throw new EmailAlreadyExistsError(email);
    }

    try {
      let group = await this.groupRepo.findByName(groupName);

      if (groupOption === 'create') {
        if (group) throw new GroupAlreadyExistsError(groupName);
        group = await this.groupRepo.create(groupName, groupPassword);
      } else if (groupOption === 'join') {
        if (!group) throw new GroupNotFoundError(groupName);
        if (group.password !== groupPassword)
          throw new GroupNotFoundError('グループ合言葉が間違っています');
      }
      if (!group) throw new Error('グループが作成または取得されませんでした');
      const user = await this.userRepo.create(authUser.user.id, username, email, group.groupId);

      return user;
    } catch (err) {
      // rollback
      await this.supabase.auth.admin.deleteUser(authUser.user.id);
      throw err;
    }
  }
}
