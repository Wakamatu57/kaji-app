import { ISupabaseClient } from '@/domain/repositories/ISupabaseClient';

export class MockSupabaseClient implements ISupabaseClient {
  auth = {
    admin: {
      createUser: async ({ email, password }: any) => ({
        data: { user: { id: 'mock-user-id', email } },
        error: null,
      }),
      deleteUser: async (userId: string) => ({ data: null, error: null }),
    },
    signInWithPassword: async ({ email, password }: any) => ({
      data: { user: { id: 'mock-user-id', email }, session: { access_token: 'mock-token' } },
      error: null,
    }),
  };

  from(table: string) {
    // 必要に応じて返すデータを切り替える
    return {
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({
              data: { id: 'mock-id', name: 'mock-group' },
              error: null,
            }),
          }),
        }),
      }),
      delete: () => ({ eq: async () => ({ error: null }) }),
    };
  }
}
