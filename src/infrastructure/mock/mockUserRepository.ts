// tests/mocks/MockUserRepository.ts
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '@/domain/entities/User';

export class MockUserRepository implements IUserRepository {
  create = async (
    userId: string,
    username: string,
    email: string,
    groupId: string,
  ): Promise<User> => {
    return new User(userId, username, email, groupId, new Date());
  };
}
