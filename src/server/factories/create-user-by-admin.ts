import { DrizzleRoleRepository } from "../repositories/drizzle/roles-drizzle-repository";
import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { CreateUserAdminUseCase } from "../use-cases/create-user-by-admin";
import { SendEmailUseCase } from "../use-cases/send-email";

export function makeRegistryUserByAdmin() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const drizzleRoleRepository = new DrizzleRoleRepository();
  const sendEmailUseCase = new SendEmailUseCase();

  const registryUserByAdminFactory = new CreateUserAdminUseCase(
    drizzleUsersRepository,
    drizzleRoleRepository,
    sendEmailUseCase
  );

  return registryUserByAdminFactory;
}
