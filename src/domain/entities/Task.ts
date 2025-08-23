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
    return new Task(
      record.task_id,
      record.title,
      record.category,
      record.date,
      record.users?.[0]?.username ?? '',
    );
  }
}
