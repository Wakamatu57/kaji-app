import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class AdminUserRepository implements IUserRepository {
  private client: SupabaseClient;

  constructor() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(url, key);
  }

  async create(userId: string, username: string, email: string, groupId: number) {
    const { data, error } = await this.client
      .from('users')
      .insert([{ user_id: userId, username, email, group_id: groupId }])
      .select()
      .single();

    if (error) throw error;
    return User.fromRecord(data);
  }

  async findById(userId: string) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return User.fromRecord(data);
  }

  async findByGroupId(groupId: number) {
    const { data, error } = await this.client.from('users').select('*').eq('group_id', groupId);
    if (error) throw error;
    return (data ?? []).map(User.fromRecord);
  }
}
