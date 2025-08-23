export interface SupabaseUser {
  id: string;
  email: string;
}

export interface AuthResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export interface ISupabaseClient {
  auth: {
    admin: {
      createUser(opts: {
        email: string;
        password: string;
        email_confirm?: boolean;
      }): Promise<AuthResponse<{ user: SupabaseUser }>>;
      deleteUser(userId: string): Promise<AuthResponse<null>>;
    };
    signInWithPassword(opts: {
      email: string;
      password: string;
    }): Promise<
      AuthResponse<{ user: SupabaseUser; session: { access_token: string; user: SupabaseUser } }>
    >;
    signOut(): Promise<AuthResponse<null>>;
    getUser(token: string): Promise<AuthResponse<{ user: SupabaseUser }>>;
    verifyToken(token: string): Promise<AuthResponse<{ user: SupabaseUser }>>;
  };
}
