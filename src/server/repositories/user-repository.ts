import { InsertSchemaUsersType, Roles, Users } from "../db/types-schema";

export interface UsersRepository {
  findByEmail(email: string): Promise<{
    user: Users;
    role: Roles | null;
    hasSendCertification: boolean;
  } | null>;
  createUser(data: InsertSchemaUsersType): Promise<Users | null>;
  updateUser(
    field: Partial<InsertSchemaUsersType>,
    userId: string
  ): Promise<Users | null>;
  checkIfUserAndPasswordCodeMatch(
    email: string,
    code: string
  ): Promise<Users | null>;
}
