import { IGroupRepository } from '../domain/repositories/IGroupRepository';
import { Group } from '../domain/entities/Group';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class GroupRepository implements IGroupRepository {
  constructor() {}
  private client = createClient(supabaseUrl, supabaseKey);

  async findByName(name: string): Promise<Group | null> {
    const { data, error } = await this.client
      .from('groups')
      .select('*')
      .eq('name', name)
      .maybeSingle();

    if (error) throw error;
    return data ? Group.fromRecord(data) : null;
  }

  async create(name: string, password: string): Promise<Group> {
    const { data, error } = await this.client
      .from('groups')
      .insert([{ name, password }])
      .select()
      .single();

    if (error) throw error;
    return Group.fromRecord(data);
  }

  async delete(groupId: string): Promise<void> {
    const { error } = await this.client.from('groups').delete().eq('group_id', groupId);
    if (error) throw error;
  }
}
