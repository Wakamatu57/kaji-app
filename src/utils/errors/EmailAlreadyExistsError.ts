export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`メールアドレス "${email}" は既に使用されています`);
    this.name = 'EmailAlreadyExistsError';
  }
}
