import { Task } from '../components/organisms/tasks-list';
import { AddTaskRequest } from '../models/add-task-request';
import { DeleteTaskRequest } from '../models/delete-task-request';
import { GetTaskRequest } from '../models/get-task-request';
import { GetTaskResponse } from '../models/get-task-response';
import { SigninRequest } from '../models/siginin-request';
import { SigninResponse } from '../models/siginin-response';
import { SignupRequest } from '../models/siginup-request';
import { UploadTaskRequest } from '../models/upload-task-request';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// 共通fetcher
export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '不明なエラーが発生しました');
  }

  return res.json();
}

// 新規登録
export function signup(data: SignupRequest): Promise<void> {
  return fetcher(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ログイン
export function signin(data: SigninRequest): Promise<SigninResponse> {
  return fetcher(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
}

// ログアウト
export function logout() {
  return fetcher(`${API_BASE}/auth/logout`, {
    method: 'POST',
  });
}

// タスク一覧取得
export function getTasks(): Promise<Task[]> {
  return fetcher(`${API_BASE}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

// タスク追加
export function addTaskApi(data: AddTaskRequest): Promise<void> {
  return fetcher(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

// タスク更新
export function updateTask(data: UploadTaskRequest): Promise<void> {
  return fetcher(`${API_BASE}/tasks/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

// タスク削除
export function deleteTask(data: DeleteTaskRequest): Promise<void> {
  return fetcher(`${API_BASE}/tasks/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
