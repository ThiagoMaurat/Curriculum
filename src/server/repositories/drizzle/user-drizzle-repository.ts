import { db } from "@/lib/drizzle";
import { UsersRepository } from "../user-repository";
import { and, eq } from "drizzle-orm";
import { InsertSchemaUsersType, Roles, Users } from "@/db/types-schema";
import { roles, users } from "@/db/schema";

export class DrizzleUsersRepository implements UsersRepository {
  async checkIfUserAndPasswordCodeMatch(
    email: string,
    code: string
  ): Promise<Users | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.resetPassword, code)));

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserAndCheckTheEmailCode(
    code: string,
    email: string
  ): Promise<Users | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.emailCodeVerified, code)));

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUser(
    field: Partial<Users>,
    userId: string
  ): Promise<Users | null> {
    const [user] = await db
      .update(users)
      .set(field)
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(
    email: string
  ): Promise<{ user: Users; role: Roles } | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .innerJoin(roles, eq(users.roleId, roles.id));

    if (!user) {
      return null;
    }

    return {
      user: user.user,
      role: user.role,
    };
  }

  async createUser(data: InsertSchemaUsersType): Promise<Users | null> {
    const [user] = await db
      .insert(users)
      .values({
        ...data,
      })
      .returning();

    return user;
  }
}
