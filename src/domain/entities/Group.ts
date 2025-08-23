export class Group {
  constructor(
    public readonly groupId: number,
    public name: string,
    public password: string,
    public createdAt: Date,
  ) {}

  static fromRecord(record: any): Group {
    return new Group(record.group_id, record.name, record.password, new Date(record.created_at));
  }
}
