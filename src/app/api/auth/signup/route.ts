import { NextRequest, NextResponse } from 'next/server';
import { SignupService } from '@/application/services/SignupServie';
import { SignupRequest } from '@/models/siginup-request';
import { GroupRepository } from '@/infrastructure/GroupRepository';
import { UserRepository } from '@/infrastructure/UserRepository';
import { SupabaseClientWrapper } from '@/infrastructure/SupabaseClientWrapper';
import { MockSupabaseClient } from '@/infrastructure/mock/mockSupabaseClientWrapper';
import { MockGroupRepository } from '@/infrastructure/mock/mockGroupRepository';
import { MockUserRepository } from '@/infrastructure/mock/mockUserRepository';
import { AdminUserRepository } from '@/infrastructure/AdminUserRepository';

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequest = await req.json();

    const isDev = process.env.NODE_ENV === 'development';

    const supabaseClient = isDev ? new MockSupabaseClient() : new SupabaseClientWrapper();
    const userRepo = isDev ? new MockUserRepository() : new AdminUserRepository();
    const groupRepo = isDev ? new MockGroupRepository() : new GroupRepository();

    const service = new SignupService(supabaseClient, groupRepo, userRepo);

    const user = await service.signup(
      body.username,
      body.email,
      body.password,
      body.groupOption,
      body.groupName,
      body.groupPassword,
    );

    return NextResponse.json({ message: '登録成功', user }, { status: 201 });
  } catch (err: Error | unknown) {
    console.error('Signup error:', err);
    if (err instanceof Error) {
      if (err.name === 'EmailAlreadyExistsError') {
        return NextResponse.json(
          { message: 'メールアドレスはすでに使用されています' },
          { status: 400 },
        );
      }
      if (err.name === 'GroupAlreadyExistsError') {
        return NextResponse.json({ message: 'グループがすでに存在します' }, { status: 400 });
      }
      if (err.name === 'GroupNotFoundError') {
        return NextResponse.json(
          { message: 'グループが存在しないかグループの合言葉が間違っています' },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { message: 'グループ作成またはグループの参加に失敗しました' },
      { status: 400 },
    );
  }
}
