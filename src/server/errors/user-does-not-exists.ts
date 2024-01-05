export class UserDoesNotExistsError extends Error {
  constructor() {
    super("Usuário inexisente");
  }
}
