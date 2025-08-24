interface UserRelation {
  username: string;
}
export interface TaskRecord {
  task_id: number;
  title: string;
  category: string;
  date: string;
  users: UserRelation | UserRelation[];
  user_id: string;
}
