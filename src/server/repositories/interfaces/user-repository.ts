import { ParamsType } from "@/validators/params-schema";
import {
  Certification,
  Curriculum,
  InsertSchemaUsersType,
  Roles,
  Users,
} from "../../db/types-schema";

export interface ListByIdOutput {
  id: string;
  name: string | null;
  email: string;
  product: string | null;
  createdAt: Date;
  createPasswordToken: string | null;
  curriculums: Curriculum | null;
  certifications: Certification[] | null;
  roles: Array<{ name: string }>;
  amount: string;
}

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
      lastPage: number;
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
  listUserById(id: string): Promise<ListByIdOutput | null>;
}
