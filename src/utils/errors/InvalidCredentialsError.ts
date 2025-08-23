export class InvalidCredentialsError extends Error {
  constructor() {
    super('メールアドレスまたはパスワードが正しくありません');
    this.name = 'InvalidCredentialsError';
  }
}
