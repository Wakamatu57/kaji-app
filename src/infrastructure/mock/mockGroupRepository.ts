// tests/mocks/MockGroupRepository.ts
import { IGroupRepository } from '@/domain/repositories/IGroupRepository';
import { Group } from '@/domain/entities/Group';

export class MockGroupRepository implements IGroupRepository {
  findByName = async (name: string): Promise<Group | null> => {
    if (name === 'group') {
      return new Group('mock-group-id', name, 'password123', new Date());
    }
    return null;
  };

  create = async (name: string, password: string): Promise<Group> => {
    return new Group('mock-group-id', name, password, new Date());
  };

  delete = async (groupId: string): Promise<void> => {
    // 何もしない
  };
}
