import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class MockSupabaseClient implements ISupabaseClient {
  private users: { id: string; email: string; password: string }[] = [
    { id: '1', email: 'test@com', password: 'password' },
  ];

  auth = {
    admin: {
      createUser: async ({ email, password }: { email: string; password: string }) => {
        const exists = this.users.find((u) => u.email === email);
        if (exists) {
          return { data: null, error: { message: 'Email already exists' } };
        }
        const newUser = { id: `mock-user-${this.users.length + 1}`, email, password };
        this.users.push(newUser);
        return { data: { user: newUser }, error: null };
      },
      deleteUser: async (userId: string) => {
        this.users = this.users.filter((u) => u.id !== userId);
        return { data: null, error: null };
      },
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      const user = this.users.find((u) => u.email === email && u.password === password);
      if (!user) {
        return { data: null, error: { message: 'Invalid credentials' } };
      }
      return {
        data: {
          user,
          session: { access_token: 'mock-token', user },
        },
        error: null,
      };
    },

    signOut: async () => {
      return { error: null };
    },
    getUser: async (token: string) => {
      const user = this.users[0] ?? null; // 適当なモック
      return { data: { user }, error: null };
    },
  };
}
