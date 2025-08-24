import { TaskRecord } from '@/models/task_record';

export class Task {
  constructor(
    public readonly taskId: number,
    public title: string,
    public category: string,
    public date: string,
    public userName: string,
  ) {}

  static fromRecord(record: TaskRecord): Task {
    const username = Array.isArray(record.users)
      ? (record.users[0]?.username ?? '')
      : (record.users?.username ?? '');
    return new Task(record.task_id, record.title, record.category, record.date, username);
  }
}
