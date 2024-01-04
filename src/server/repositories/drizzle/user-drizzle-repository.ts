import { db } from "@/lib/drizzle";
import { UsersRepository } from "../user-repository";
import { eq } from "drizzle-orm";
import { InsertSchemaUsersType, Roles, Users } from "@/db/types-schema";
import { roles, users } from "@/db/schema";

export class DrizzleUsersRepository implements UsersRepository {
  async findByEmail(
    email: string
  ): Promise<{ user: Users; role: Roles } | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .innerJoin(roles, eq(roles.id, users.roleId));

    if (!user) {
      return null;
    }

    return {
      user: user.user,
      role: user.role,
    };
  }

  async createUser(
    data: Omit<InsertSchemaUsersType, "roleId">
  ): Promise<Users | null> {
    const [userRole] = await db
      .select({ id: roles.id })
      .from(roles)
      .where(eq(roles.name, "user"));

    const [user] = await db
      .insert(users)
      .values({
        ...data,
        roleId: userRole.id,
      })
      .returning();

    if (!user) {
      return null;
    }

    return user;
  }
}
