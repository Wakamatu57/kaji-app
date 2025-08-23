import { createClient } from '@supabase/supabase-js';
import { Task } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { TaskRecord } from '@/models/task_record';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class TaskRepository implements ITaskRepository {
  private client = createClient(supabaseUrl, supabaseKey);

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
        users(username)
      `,
      )
      .eq('group_id', groupId);

    if (error) throw error;

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
