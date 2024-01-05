import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const registerUseCase = new AuthenticateUseCase(drizzleUsersRepository);

  return registerUseCase;
}
