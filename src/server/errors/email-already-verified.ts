export class EmailAlreadyVerifiedError extends Error {
  constructor() {
    super("Email ja verificado");
  }
}
