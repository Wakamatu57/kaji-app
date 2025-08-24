import { createClient } from '@supabase/supabase-js';
import { Task } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { TaskRecord } from '@/models/task_record';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export class TaskRepository implements ITaskRepository {
  private client: SupabaseClient;
  constructor(accessToken: string) {
    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        storage: undefined,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined },
    });
  }

  async findByGroupId(groupId: number): Promise<Task[]> {
    const { data, error } = await this.client
      .from('tasks')
      .select(
        `
    task_id,
    title,
    category,
    date,
    user_id,
    users!inner(
      username,
      group_id
    )
  `,
      )
      .eq('users.group_id', groupId);

    if (error) throw error;
    console.log('data: ', data);
    return (data ?? []).map((record) =>
      Task.fromRecord({
        task_id: record.task_id,
        title: record.title,
        category: record.category,
        date: record.date,
        users: record.users,
        user_id: record.user_id,
      }),
    );
  }

  async create(userId: string, title: string, category: string, date: string): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .insert([{ user_id: userId, title, category, date }])
      .select()
      .single();

    if (error) throw error;
    return Task.fromRecord(data);
  }

  async update(taskId: number, title: string, category: string): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .update({ title, category })
      .eq('task_id', taskId)
      .select()
      .single();

    if (error) throw error;
    return Task.fromRecord(data);
  }

  async delete(taskId: number): Promise<void> {
    const { error } = await this.client.from('tasks').delete().eq('task_id', taskId);
    if (error) throw error;
  }

  async findByUserIds(userIds: string[]): Promise<Task[]> {
    const { data, error } = await this.client
      .from('tasks')
      .select(
        `
        task_id,
        title,
        category,
        date,
        user_id,
        users(username)
      `,
      )
      .in('user_id', userIds);

    if (error) throw error;

    return (data ?? []).map((record: TaskRecord) =>
      Task.fromRecord({
        task_id: record.task_id,
        title: record.title,
        category: record.category,
        date: record.date,
        users: record.users,
        user_id: record.user_id,
      }),
    );
  }
}
