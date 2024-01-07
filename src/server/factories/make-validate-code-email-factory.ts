import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { ValidateCodeEmail } from "../use-cases/validate-code-email";

export function makeValidateCodeEmailFactory() {
  const drizzleUsersRepository = new DrizzleUsersRepository();

  const validateCodeEmail = new ValidateCodeEmail(drizzleUsersRepository);

  return validateCodeEmail;
}
