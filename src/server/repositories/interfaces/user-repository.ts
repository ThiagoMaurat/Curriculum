import { ParamsType } from "@/validators/params-schema";
import {
  Certification,
  InsertSchemaUsersType,
  Roles,
  Users,
} from "../../db/types-schema";

export interface UsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  getUserData(email: string): Promise<{
    user: Users;
    role: Roles | null;
    hasSendCertification: boolean;
  } | null>;
  createUser(data: InsertSchemaUsersType): Promise<Users | null>;
  checkIfUserAndPasswordCodeMatch(
    email: string,
    code: string
  ): Promise<Users | null>;
  checkIfUserCanCreatePassword(email: string, code: string): Promise<boolean>;
  updateUserByEmail(
    field: Partial<InsertSchemaUsersType>,
    email: string
  ): Promise<Users | null>;
  listUsers(params?: ParamsType): Promise<{
    metadata: {
      total: number;
      page: number;
    };
    user: {
      id: string;
      email: string;
      name: string | null;
      product: string | null;
      createdAt: Date;
      certifications: Certification[];
      roles: Array<{ name: string }>;
    }[];
  } | null>;
}
