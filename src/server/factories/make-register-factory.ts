import { DrizzleRoleRepository } from "../repositories/drizzle/roles-drizzle-repository";
import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { RegisterUseCaseInputAndSendEmail } from "../use-cases/register-user";
import { SendEmailUseCase } from "../use-cases/send-email";

export function makeRegistryFactory() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const drizzleRoleRepository = new DrizzleRoleRepository();
  const sendEmailUseCase = new SendEmailUseCase();

  const registerUseCase = new RegisterUseCaseInputAndSendEmail(
    drizzleUsersRepository,
    drizzleRoleRepository,
    sendEmailUseCase
  );

  return registerUseCase;
}
