import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '@/domain/entities/User';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [
    new User('1', 'testuser', 'test@com', 1, new Date()),
    new User('2', 'hanako', 'hanako@com', 2, new Date()),
    new User('3', 'taro', 'taro@com', 3, new Date()),
  ];
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

  findByGroupId = async (groupId: number): Promise<User[]> => {
    return this.users.filter((u) => u.groupId === groupId);
  };
}
