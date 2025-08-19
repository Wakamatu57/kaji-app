export class GroupAlreadyExistsError extends Error {
  constructor(groupName: string) {
    super(`グループ "${groupName}" は既に存在します`);
    this.name = 'GroupAlreadyExistsError';
  }
}
