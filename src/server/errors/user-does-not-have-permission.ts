export class UserDoesNotHavePermission extends Error {
  constructor() {
    super("Usuário não possui essa permissão");
  }
}
