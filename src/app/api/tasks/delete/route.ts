import { NextRequest, NextResponse } from 'next/server';
import { DeleteTaskService } from '@/application/services/DeleteTaskService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';
import { getUserFromCookies, setAuthCookies } from '@/utils/auth';

const isDev = process.env.NODE_ENV === 'development';

export async function POST(req: NextRequest) {
  const { user, accessToken, refreshToken } = await getUserFromCookies(req);
  if (!user || !accessToken || !refreshToken)
    return NextResponse.json({ message: 'ログイン画面からやり直してください' }, { status: 401 });

  const taskRepository = isDev ? new MockTaskRepository() : new TaskRepository(accessToken);

  try {
    const { taskId } = await req.json();

    const service = new DeleteTaskService(taskRepository);
    await service.deleteTask(taskId);

    const res = NextResponse.json({ message: 'タスク削除成功' }, { status: 200 });
    if (!accessToken || !refreshToken) return res;
    setAuthCookies(accessToken, refreshToken, res);
    return res;
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'タスク削除失敗';
    return NextResponse.json({ message }, { status: 500 });
  }
}
