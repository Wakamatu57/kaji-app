import { NextRequest, NextResponse } from 'next/server';
import { GetTasksService } from '@/application/services/GetTasksService';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { UserRepository } from '@/infrastructure/UserRepository';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';
import { CreateTaskService } from '@/application/services/CreateTaskService';
import { getUserFromCookies, setAuthCookies } from '@/utils/auth';

const isDev = process.env.NODE_ENV === 'development';

export async function GET(req: NextRequest) {
  const { user, accessToken, refreshToken } = await getUserFromCookies(req);
  if (!user || !accessToken || !refreshToken)
    return NextResponse.json({ message: 'ログイン画面からやり直してください' }, { status: 401 });

  const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
  const taskRepository = isDev ? new MockTaskRepository() : new TaskRepository(accessToken);
  const userRepository = isDev ? new MockUserRepository() : new UserRepository(accessToken);

  try {
    const taskService = new GetTasksService(supabaseClient, taskRepository, userRepository);
    const tasks = await taskService.getTasks(user.id);

    const res = NextResponse.json(tasks, { status: 200 });
    if (!accessToken || !refreshToken) return res;
    setAuthCookies(accessToken, refreshToken, res);

    return res;
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ message: 'タスク取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { user, accessToken, refreshToken } = await getUserFromCookies(req);
  if (!user || !accessToken || !refreshToken)
    return NextResponse.json({ message: 'ログイン画面からやり直してください' }, { status: 401 });
  const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
  const taskRepository = isDev ? new MockTaskRepository() : new TaskRepository(accessToken);
  const userRepository = isDev ? new MockUserRepository() : new UserRepository(accessToken);
  try {
    const { title, category } = await req.json();

    const service = new CreateTaskService(supabaseClient, taskRepository, userRepository);
    const task = await service.createTask(user.id, title, category);

    const res = NextResponse.json(task, { status: 201 });
    if (!accessToken || !refreshToken) return res;
    setAuthCookies(accessToken, refreshToken, res);
    return res;
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ message: 'タスク追加失敗' }, { status: 500 });
  }
}
