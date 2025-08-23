export class Task {
  constructor(
    public readonly taskId: string,
    public title: string,
    public category: string,
    public date: string,
    public userName: string,
  ) {}

  static fromRecord(record: any): Task {
    return new Task(
      record.task_id,
      record.title,
      record.category,
      record.date,
      record.user_name ?? record.username ?? '',
    );
  }
}
