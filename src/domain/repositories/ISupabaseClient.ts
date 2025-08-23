export interface ISupabaseClient {
  auth: {
    admin: {
      createUser(opts: { email: string; password: string; email_confirm?: boolean }): Promise<any>;
      deleteUser(userId: string): Promise<any>;
    };
    signInWithPassword(opts: { email: string; password: string }): Promise<any>;
    signOut(): Promise<any>;
    getUser(token: string): Promise<any>;
  };
}
