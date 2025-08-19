import { User } from '../domain/entities/User';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class UserRepository implements IUserRepository {
  constructor(private supabase: ISupabaseClient) {}

  async create(userId: string, username: string, email: string, groupId: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ user_id: userId, username, email, group_id: groupId }])
      .select()
      .single();

    if (error) throw error;
    return User.fromRecord(data);
  }
}
