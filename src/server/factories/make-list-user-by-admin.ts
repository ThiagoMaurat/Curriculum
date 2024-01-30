import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { ListUsersByAdminUseCase } from "../use-cases/list-user-by-admin";

export function makeListUserByAdminFactory() {
  const drizzleUsersRepository = new DrizzleUsersRepository();

  const listUserByAdmin = new ListUsersByAdminUseCase(drizzleUsersRepository);

  return listUserByAdmin;
}
