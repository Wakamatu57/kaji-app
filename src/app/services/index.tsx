import { SigninRequest } from '@/models/siginin-request';
import { SigninResponse } from '@/models/siginin-response';
import { SignupRequest } from '@/models/siginup-request';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// 共通fetcher
export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.json());
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
  });
}

// ログアウト
export function logout() {
  return fetcher(`${API_BASE}/auth/logout`, {
    method: 'POST',
  });
}

// タスク一覧取得
export function getTasks(session: string, email: string) {
  return fetcher(`${API_BASE}/tasks`, {
    method: 'GET',
    headers: { session, email },
  });
}

// タスク追加
export function addTask(session: string, email: string, data: { title: string; category: string }) {
  return fetcher(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', session, email },
    body: JSON.stringify(data),
  });
}

// タスク更新
export function updateTask(
  session: string,
  email: string,
  data: { taskId: string; title: string; category: string },
) {
  return fetcher(`${API_BASE}/tasks/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', session, email },
    body: JSON.stringify(data),
  });
}

// タスク削除
export function deleteTask(session: string, email: string, data: { taskId: string }) {
  return fetcher(`${API_BASE}/tasks/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', session, email },
    body: JSON.stringify(data),
  });
}
