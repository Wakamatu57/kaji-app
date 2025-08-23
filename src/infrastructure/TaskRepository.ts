import { createClient } from '@supabase/supabase-js';
import { Task } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';

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

    return (data ?? []).map((record: any) =>
      Task.fromRecord({
        task_id: record.task_id,
        title: record.title,
        category: record.category,
        date: record.date,
        userName: record.users?.username ?? '',
      }),
    );
  }
}
