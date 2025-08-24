import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from '../domain/entities/User';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { UserRecord } from '@/models/user-record';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class UserRepository implements IUserRepository {
  private client: SupabaseClient;
  constructor(accessToken: string) {
    this.client = createClient(supabaseUrl, '', {
      auth: {
        persistSession: false,
        storage: undefined,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined },
    });
  }

  async create(userId: string, username: string, email: string, groupId: number): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert([{ user_id: userId, username, email, group_id: groupId }])
      .select()
      .single();

    if (error) throw error;
    return User.fromRecord(data);
  }

  async findById(userId: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return User.fromRecord(data);
  }

  async findByGroupId(groupId: number): Promise<User[]> {
    const { data, error } = await this.client.from('users').select('*').eq('group_id', groupId);

    if (error) throw error;

    return (data ?? []).map((record: UserRecord) => User.fromRecord(record));
  }
}
