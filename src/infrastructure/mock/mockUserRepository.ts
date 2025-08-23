import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '@/domain/entities/User';

export class MockUserRepository implements IUserRepository {
  create = async (
    userId: string,
    username: string,
    email: string,
    groupId: number,
  ): Promise<User> => {
    return new User(userId, username, email, groupId, new Date());
  };
  findById = async (userId: string): Promise<User | null> => {
    if (userId === '1') {
      return new User('1', 'testuser', 'test@com', 1, new Date());
    }
    return null;
  };
}
