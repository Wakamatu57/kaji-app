import { ISupabaseClient, AuthResponse, SupabaseUser } from '@/domain/repositories/ISupabaseClient';

export class MockSupabaseClient implements ISupabaseClient {
  private users: SupabaseUser[] = [{ id: '1', email: 'test@com' }];

  auth = {
    admin: {
      createUser: async (opts: {
        email: string;
        password: string;
        email_confirm?: boolean;
      }): Promise<AuthResponse<{ user: SupabaseUser }>> => {
        const exists = this.users.find((u) => u.email === opts.email);
        if (exists) return { data: null, error: { message: 'Email already exists' } };
        const newUser: SupabaseUser = {
          id: `mock-user-${this.users.length + 1}`,
          email: opts.email,
        };
        this.users.push(newUser);
        return { data: { user: newUser }, error: null };
      },
      deleteUser: async (userId: string): Promise<AuthResponse<null>> => {
        this.users = this.users.filter((u) => u.id !== userId);
        return { data: null, error: null };
      },
      refreshSession: async (
        refresh_token: string,
      ): Promise<
        AuthResponse<{
          session: { access_token: string; refresh_token: string; user: SupabaseUser };
        }>
      > => {
        const user = this.users[0];
        return {
          data: {
            session: {
              access_token: 'mock-access-token-' + Math.random().toString(36).substring(2, 10),
              refresh_token: 'mock-refresh-token-' + Math.random().toString(36).substring(2, 10),
              user,
            },
          },
          error: null,
        };
      },
    },

    signInWithPassword: async (opts: {
      email: string;
      password: string;
    }): Promise<
      AuthResponse<{
        user: SupabaseUser;
        session: { access_token: string; refresh_token: string; user: SupabaseUser };
      }>
    > => {
      const user = this.users.find((u) => u.email === opts.email);
      if (!user) return { data: null, error: { message: 'Invalid credentials' } };
      return {
        data: { user, session: { access_token: 'mock-token', refresh_token: 'refrsh', user } },
        error: null,
      };
    },

    signOut: async (): Promise<AuthResponse<null>> => ({ data: null, error: null }),

    getUser: async (token: string): Promise<AuthResponse<{ user: SupabaseUser }>> => {
      return { data: { user: this.users[0] }, error: null };
    },

    verifyToken: async (token: string): Promise<AuthResponse<{ user: SupabaseUser }>> => {
      return { data: { user: this.users[0] }, error: null };
    },
  };
}
