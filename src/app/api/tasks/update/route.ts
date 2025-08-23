import { NextRequest, NextResponse } from 'next/server';
import { UpdateTaskService } from '@/application/services/UpdateTaskService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session');
    if (!cookie) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId, title, category } = await req.json();

    // const supabaseClient = new SupabaseClientWrapper();
    // const taskRepository = new TaskRepository();
    const supabaseClient = new MockSupabaseClient();
    const taskRepository = new MockTaskRepository();

    const service = new UpdateTaskService(supabaseClient, taskRepository);

    const updatedTask = await service.updateTask(cookie.value, taskId, title, category);

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || 'タスク更新失敗' }, { status: 500 });
  }
}
