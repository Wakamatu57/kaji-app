import { GroupRecord } from '@/models/group-record';

export class Group {
  constructor(
    public readonly groupId: number,
    public name: string,
    public password: string,
    public createdAt: Date,
  ) {}

  static fromRecord(record: GroupRecord): Group {
    return new Group(record.group_id, record.name, record.password, new Date(record.created_at));
  }
}
