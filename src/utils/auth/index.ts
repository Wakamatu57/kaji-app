import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { SupabaseUser } from '@/domain/repositories/ISupabaseClient';

const isDev = process.env.NODE_ENV === 'development';
const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();

export async function getUserFromCookies(
  req: NextRequest,
): Promise<{ user: SupabaseUser | null; accessToken: string | null; refreshToken: string | null }> {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) return { user: null, accessToken: null, refreshToken: null };

  // access_token でユーザー確認
  const { data: userData, error: userError } = await supabaseClient.auth.getUser(accessToken);

  if (!userData?.user || userError) {
    // 有効期限切れ → refresh_token で更新
    const { data: refreshed, error: refreshError } =
      await supabaseClient.auth.admin.refreshSession(refreshToken);

    if (refreshError || !refreshed?.session)
      return { user: null, accessToken: null, refreshToken: null };

    return {
      user: refreshed.session.user,
      accessToken: refreshed.session.access_token,
      refreshToken: refreshed.session.refresh_token,
    };
  }

  return { user: userData.user, accessToken, refreshToken };
}

export function setAuthCookies(accessToken: string, refreshToken: string, res: NextResponse) {
  res.cookies.set({
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
  });

  res.cookies.set({
    name: 'refresh_token',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}
