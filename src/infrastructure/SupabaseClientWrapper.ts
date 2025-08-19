import { createClient } from '@supabase/supabase-js';
import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class SupabaseClientWrapper implements ISupabaseClient {
  private client = createClient(supabaseUrl, supabaseKey);

  from(table: string) {
    return this.client.from(table);
  }

  auth = {
    admin: {
      createUser: async (opts: { email: string; password: string; email_confirm?: boolean }) =>
        this.client.auth.admin.createUser(opts),
      deleteUser: async (userId: string) => this.client.auth.admin.deleteUser(userId),
    },
    signInWithPassword: async (opts: { email: string; password: string }) =>
      this.client.auth.signInWithPassword(opts),
  };
}
