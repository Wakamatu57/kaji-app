import { Group } from '@/domain/entities/Group';

export interface IGroupRepository {
  findByName(name: string): Promise<Group | null>;
  create(name: string, password: string): Promise<Group>;
  delete(groupId: string): Promise<void>;
}
