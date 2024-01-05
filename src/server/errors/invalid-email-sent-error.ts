export class InvalidEmailSentError extends Error {
  constructor() {
    super("Invalid email sent");
  }
}
