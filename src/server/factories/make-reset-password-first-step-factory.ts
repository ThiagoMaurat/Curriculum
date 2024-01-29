import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { ResetPasswordSendEmailUseCase } from "../use-cases/reset-password/first-step-send-email";
import { SendEmailUseCase } from "../use-cases/send-email";

export function makeResetPasswordFirstStep() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const sendEmailUseCase = new SendEmailUseCase();

  const resetPassword = new ResetPasswordSendEmailUseCase(
    drizzleUsersRepository,
    sendEmailUseCase
  );

  return resetPassword;
}
