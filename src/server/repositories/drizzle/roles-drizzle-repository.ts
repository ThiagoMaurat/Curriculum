import { InsertSchemaRolesType, Roles } from "@/server/db/types-schema";

import { RolesRepository } from "../roles-repository";
import { db } from "@/lib/drizzle";
import { roles } from "@/server/db/schema";

export class DrizzleRoleRepository implements RolesRepository {
  async insertRole(data: InsertSchemaRolesType): Promise<Roles | null> {
    const [role] = await db.insert(roles).values(data).returning();

    if (!role) {
      return null;
    }

    return role;
  }
}
