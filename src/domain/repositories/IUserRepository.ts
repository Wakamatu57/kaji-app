import { User } from '@/domain/entities/User';

export interface IUserRepository {
  create(userId: string, username: string, email: string, groupId: string): Promise<User>;
}
