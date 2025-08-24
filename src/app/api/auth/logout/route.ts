import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { AuthService } from '@/application/services/AuthService';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/infrastructure/UserRepository';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';
import { AdminUserRepository } from '@/infrastructure/AdminUserRepository';

export async function POST(req: NextRequest) {
  try {
    const isDev = process.env.NODE_ENV === 'development';

    const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
    const userRepository = isDev ? new MockUserRepository() : new AdminUserRepository();

    const authService = new AuthService(supabaseClient, userRepository);

    await authService.logout();

    // Cookieを削除
    const res = NextResponse.json({ message: 'ログアウトしました' }, { status: 200 });
    res.cookies.set('access_token', '', { expires: new Date(0) });
    res.cookies.set('refresh_token', '', { expires: new Date(0) });
    return res;
  } catch (err: unknown) {
    console.error('Logout error:', err);
    return NextResponse.json({ message: 'ログアウトに失敗しました' }, { status: 500 });
  }
}
