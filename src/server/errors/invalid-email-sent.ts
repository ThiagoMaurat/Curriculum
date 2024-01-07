export class InvalidEmailSentError extends Error {
  constructor() {
    super("Erro ao enviar e-mail");
  }
}
