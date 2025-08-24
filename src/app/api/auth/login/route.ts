import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/application/services/AuthService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { InvalidCredentialsError } from '@/utils/errors/InvalidCredentialsError';
import { SigninRequest } from '@/models/siginin-request';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/infrastructure/UserRepository';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';
import { setAuthCookies } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const body: SigninRequest = await req.json();
    const { email, password } = body;

    const isDev = process.env.NODE_ENV === 'development';

    const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
    const userRepository = isDev ? new MockUserRepository() : new UserRepository();

    const authService = new AuthService(supabaseClient, userRepository);

    const { user, session, username } = await authService.login(email, password);

    // セッションを Cookie に保存
    const res = NextResponse.json({ username }, { status: 200 });
    setAuthCookies(session.access_token, session.refresh_token, res);
    return res;
  } catch (err: unknown) {
    console.error('Login error:', err);

    if (err instanceof InvalidCredentialsError) {
      return NextResponse.json(
        { message: 'メールアドレスまたはパスワードが間違っています' },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: 'ログインに失敗しました' }, { status: 500 });
  }
}
