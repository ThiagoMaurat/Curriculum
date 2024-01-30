import { InsertSchemaRolesType, Roles } from "../../db/types-schema";

export interface RolesRepository {
  insertRole(data: InsertSchemaRolesType): Promise<Roles | null>;
}
