import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { ResetPasswordSecondStepUseCase } from "../use-cases/reset-password/second-step-validation";

export function makeResetPasswordSecondStep() {
  const drizzleUsersRepository = new DrizzleUsersRepository();

  const resetPassword = new ResetPasswordSecondStepUseCase(
    drizzleUsersRepository
  );

  return resetPassword;
}
