import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { InvalidCredentialsError } from '@/utils/errors/InvalidCredentialsError';

export class AuthService {
  constructor(
    private supabase: ISupabaseClient,
    private userRepo: IUserRepository,
  ) {}

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user || !data?.session) {
      throw new InvalidCredentialsError();
    }

    const appUser = await this.userRepo.findById(data.user.id);

    return { user: data.user, session: data.session, username: appUser?.username ?? null };
  }

  async verifyToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new Error('無効なトークン');
    }
    return data.user;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}
