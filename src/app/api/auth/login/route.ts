import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/application/services/AuthService';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { InvalidCredentialsError } from '@/utils/errors/InvalidCredentialsError';
import { SigninRequest } from '@/models/siginin-request';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/infrastructure/UserRepository';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';

export async function POST(req: NextRequest) {
  try {
    const body: SigninRequest = await req.json();
    const { email, password } = body;

    // const supabaseClient = new SupabaseClientWrapper();
    // const userRepo = new UserRepository();
    const supabaseClient = new MockSupabaseClient();
    const userRepo = new MockUserRepository();

    const authService = new AuthService(supabaseClient, userRepo);

    const { user, session, username } = await authService.login(email, password);

    // セッションを Cookie に保存
    const res = NextResponse.json({ username }, { status: 200 });
    res.cookies.set({
      name: 'session',
      value: session.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 本番のみ https 限定
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7日
    });

    return res;
  } catch (err: any) {
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
