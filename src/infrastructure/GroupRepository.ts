import { IGroupRepository } from '../domain/repositories/IGroupRepository';
import { Group } from '../domain/entities/Group';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class GroupRepository implements IGroupRepository {
  constructor(private supabase: ISupabaseClient) {}

  async findByName(name: string): Promise<Group | null> {
    const { data, error } = await this.supabase
      .from('groups')
      .select('*')
      .eq('name', name)
      .maybeSingle();

    if (error) throw error;
    return data ? Group.fromRecord(data) : null;
  }

  async create(name: string, password: string): Promise<Group> {
    const { data, error } = await this.supabase
      .from('groups')
      .insert([{ name, password }])
      .select()
      .single();

    if (error) throw error;
    return Group.fromRecord(data);
  }

  async delete(groupId: string): Promise<void> {
    const { error } = await this.supabase.from('groups').delete().eq('group_id', groupId);
    if (error) throw error;
  }
}
