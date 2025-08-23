import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ISupabaseClient, AuthResponse, SupabaseUser } from '@/domain/repositories/ISupabaseClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class SupabaseClientWrapper implements ISupabaseClient {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  auth = {
    admin: {
      createUser: async (opts: {
        email: string;
        password: string;
        email_confirm?: boolean;
      }): Promise<AuthResponse<{ user: SupabaseUser }>> => {
        const { data, error } = await this.client.auth.admin.createUser(opts);
        if (error) {
          console.error('Error creating user:', error);
        }

        if (!data?.user) return { data: null, error };

        // User を SupabaseUser 型に変換
        const supabaseUser: SupabaseUser = {
          ...data.user,
          email: data.user.email || '', // undefined なら空文字
        };

        return { data: { user: supabaseUser }, error };
      },

      deleteUser: async (userId: string): Promise<AuthResponse<null>> => {
        const { error } = await this.client.auth.admin.deleteUser(userId);
        return { data: null, error };
      },
    },

    signInWithPassword: async (opts: {
      email: string;
      password: string;
    }): Promise<
      AuthResponse<{ user: SupabaseUser; session: { access_token: string; user: SupabaseUser } }>
    > => {
      const { data, error } = await this.client.auth.signInWithPassword(opts);
      console.log('signInWithPassword error:', error);
      if (!data) return { data: null, error };

      const user: SupabaseUser = {
        ...data.user,
        id: data.user?.id || '',
        email: data.user?.email || '',
      };

      return {
        data: { user, session: { access_token: data.session?.access_token || '', user } },
        error,
      };
    },

    signOut: async (): Promise<AuthResponse<null>> => {
      const { error } = await this.client.auth.signOut();
      return { data: null, error };
    },

    getUser: async (token: string): Promise<AuthResponse<{ user: SupabaseUser }>> => {
      const { data, error } = await this.client.auth.getUser(token);
      if (!data?.user) return { data: null, error };

      const user: SupabaseUser = {
        ...data.user,
        email: data.user.email || '',
      };

      return { data: { user }, error };
    },

    verifyToken: async (token: string): Promise<AuthResponse<{ user: SupabaseUser }>> => {
      return this.auth.getUser(token);
    },
  };
}
