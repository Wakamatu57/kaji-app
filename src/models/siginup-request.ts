export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  groupName: string;
  groupOption: 'create' | 'join';
  groupPassword: string;
}
