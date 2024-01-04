import { InsertSchemaUsersType, Roles, Users } from "../../db/types-schema";

export interface UsersRepository {
  findByEmail(email: string): Promise<{ user: Users; role: Roles } | null>;
  createUser(data: InsertSchemaUsersType): Promise<Users | null>;
}
