export class GroupNotFoundError extends Error {
  constructor(groupName: string) {
    super(`指定されたグループ "${groupName}" が存在しません`);
    this.name = 'GroupNotFoundError';
  }
}
