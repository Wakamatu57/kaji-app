import { NextRequest, NextResponse } from 'next/server';
import { UpdateTaskService } from '@/application/services/UpdateTaskService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';
import { getUserFromCookies, setAuthCookies } from '@/utils/auth';

export async function POST(req: NextRequest) {
  const { user, accessToken, refreshToken } = await getUserFromCookies(req);
  if (!user || !accessToken || !refreshToken)
    return NextResponse.json({ message: 'ログイン画面からやり直してください' }, { status: 401 });

  try {
    const { taskId, title, category } = await req.json();

    const isDev = process.env.NODE_ENV === 'development';
    const taskRepository = isDev ? new MockTaskRepository() : new TaskRepository(accessToken);

    const service = new UpdateTaskService(taskRepository);

    const updatedTask = await service.updateTask(taskId, title, category);

    const res = NextResponse.json(updatedTask, { status: 200 });

    if (!accessToken || !refreshToken) return res;
    setAuthCookies(accessToken, refreshToken, res);

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'タスク更新失敗';
    return NextResponse.json({ message }, { status: 500 });
  }
}
