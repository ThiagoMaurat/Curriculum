import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { RegisterUseCaseInputAndSendEmail } from "../use-cases/register-user";
import { SendEmailUseCase } from "../use-cases/send-email";

export function makeRegistryFactory() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const sendEmailUseCase = new SendEmailUseCase();

  const registerUseCase = new RegisterUseCaseInputAndSendEmail(
    drizzleUsersRepository,
    sendEmailUseCase
  );

  return registerUseCase;
}
