import { db } from "@/server/db/drizzle";
import { UsersRepository } from "../interfaces/user-repository";
import { and, eq } from "drizzle-orm";
import { InsertSchemaUsersType, Roles, Users } from "@/server/db/types-schema";
import { curriculums, roles, users } from "@/server/db/schema";

export class DrizzleUsersRepository implements UsersRepository {
  async checkIfUserCanCreatePassword(
    email: string,
    code: string
  ): Promise<boolean> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.createPasswordToken, code)));

    if (!user) {
      return false;
    }

    return true;
  }

  async checkIfUserAndPasswordCodeMatch(
    email: string,
    code: string
  ): Promise<Users | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.resetPasswordToken, code)));

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUserByEmail(
    field: Partial<Users>,
    email: string
  ): Promise<Users | null> {
    const [user] = await db
      .update(users)
      .set(field)
      .where(eq(users.email, email))
      .returning();

    if (!user) {
      return null;
    }

    return user;
  }

  async getUserData(email: string): Promise<{
    user: Users;
    role: Roles | null;
    hasSendCertification: boolean;
  } | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .leftJoin(roles, eq(users.id, roles.userId))
      .leftJoin(curriculums, eq(users.id, curriculums.userId));

    return {
      user: user?.user ?? null,
      role: user?.role ?? null,
      hasSendCertification: user?.curriculum?.userId ? true : false,
    };
  }

  async findByEmail(email: string): Promise<Users | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(data: InsertSchemaUsersType): Promise<Users | null> {
    const [user] = await db
      .insert(users)
      .values({
        ...data,
      })
      .returning();

    if (!user) {
      return null;
    }

    return user;
  }
}
