import { NextRequest, NextResponse } from 'next/server';
import { DeleteTaskService } from '@/application/services/DeleteTaskService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session');
    if (!cookie) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId } = await req.json();

    const isDev = process.env.NODE_ENV === 'development';

    const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
    const taskRepository = isDev ? new MockTaskRepository() : new TaskRepository();

    const service = new DeleteTaskService(supabaseClient, taskRepository);

    await service.deleteTask(cookie.value, taskId);
    return NextResponse.json({ message: 'タスク削除成功' }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'タスク削除失敗';
    return NextResponse.json({ message }, { status: 500 });
  }
}
