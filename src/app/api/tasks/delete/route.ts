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

    // const supabaseClient = new SupabaseClientWrapper();
    // const taskRepository = new TaskRepository();
    const supabaseClient = new MockSupabaseClient();
    const taskRepository = new MockTaskRepository();

    const service = new DeleteTaskService(supabaseClient, taskRepository);

    await service.deleteTask(cookie.value, taskId);
    console.log('Task deleted successfully');
    return NextResponse.json({ message: 'タスク削除成功' }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || 'タスク削除失敗' }, { status: 500 });
  }
}
