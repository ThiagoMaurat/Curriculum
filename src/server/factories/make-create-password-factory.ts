import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { CreatePasswordUseCase } from "../use-cases/create-password";

export function makeRegistryCreatePassword() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const createPasswordFactory = new CreatePasswordUseCase(
    drizzleUsersRepository
  );

  return createPasswordFactory;
}
