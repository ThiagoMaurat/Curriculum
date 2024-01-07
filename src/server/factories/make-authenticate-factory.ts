import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateFactory() {
  const drizzleUsersRepository = new DrizzleUsersRepository();

  const authenticateUseCase = new AuthenticateUseCase(drizzleUsersRepository);

  return authenticateUseCase;
}
