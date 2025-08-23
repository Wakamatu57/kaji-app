import { UserRecord } from '@/models/user-record';

export class User {
  constructor(
    public readonly userId: string,
    public username: string,
    public email: string,
    public groupId: number,
    public createdAt: Date,
  ) {}

  static fromRecord(record: UserRecord): User {
    return new User(
      record.user_id,
      record.username,
      record.email,
      record.group_id,
      new Date(record.created_at),
    );
  }
}
