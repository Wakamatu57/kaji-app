import { NextRequest, NextResponse } from 'next/server';
import { GetTasksService } from '@/application/services/GetTasksService';
import { TaskRepository } from '@/infrastructure/TaskRepository';
import { UserRepository } from '@/infrastructure/UserRepository';
import { AuthService } from '@/application/services/AuthService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';
import { MockTaskRepository } from '@/infrastructure/mock/mockTaskRepository';
import { CreateTaskService } from '@/application/services/CreateTaskService';

// const supabaseClient = new SupabaseClientWrapper();
// const taskRepository = new TaskRepository();
// const userRepository = new UserRepository();
const supabaseClient = new MockSupabaseClient();
const taskRepository = new MockTaskRepository();
const userRepository = new MockUserRepository();

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session');
    if (!cookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const taskService = new GetTasksService(supabaseClient, taskRepository, userRepository);

    const tasks = await taskService.getTasks(cookie.value);

    return NextResponse.json(tasks, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('session')?.value;
    if (!sessionToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { title, category } = await req.json();

    const service = new CreateTaskService(supabaseClient, taskRepository, userRepository);
    const task = await service.createTask(sessionToken, title, category);

    return NextResponse.json(task, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: 'タスク追加失敗' }, { status: 500 });
  }
}
