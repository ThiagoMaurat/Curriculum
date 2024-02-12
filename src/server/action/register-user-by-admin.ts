"use server";

import { action } from "@/lib/safe-action";
import { createUserAdminAction } from "@/validators/create-user-admin";
import { unstable_noStore as noStore } from "next/cache";
import { randomUUID } from "node:crypto";
import { ProductsConst } from "@/const/products";
import { db } from "../db/drizzle";
import { curriculums, roles, users } from "../db/schema";
import { getServerAuthSession } from "../../../auth";
import { render } from "@react-email/render";
import CreatePassword from "@/email-templates/create-password";
import transporter from "@/lib/node-mailer";
import { env } from "../../../env.mjs";

export const registerUserByAdmin = action(
  createUserAdminAction,
  async ({ email, name, role, userRole, amount, product }) => {
    noStore();
    const serverSession = getServerAuthSession();

    if (!serverSession) {
      throw new Error("Unauthorized");
    }

    const permittedRolesSupervisor = ["user"];
    const permittedRolesCoordinator = [
      "coordinator",
      "user",
      "supervisor",
      "collaborator",
    ];
    const permittedRolesCollaborator = [""];
    const permittedUserRoles = [""];

    switch (userRole) {
      case "supervisor":
        if (!permittedRolesSupervisor.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
        break;
      case "coordinator":
        if (!permittedRolesCoordinator.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
        break;
      case "collaborator":
        if (!permittedRolesCollaborator.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
      case "user":
        if (!permittedUserRoles.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
        break;
    }

    const createPasswordToken = randomUUID();

    if (role === "user" && !product) {
      throw new Error("Obrigatório um produto para esse usuário");
    }

    if (role === "user" && !ProductsConst.includes(product!)) {
      throw new Error("Produto indisponível");
    }

    const emailHtml = render(CreatePassword({ createPasswordToken, email }));

    const emailSent = await transporter.sendMail({
      html: emailHtml,
      from: `${env.GMAIL_MAIL}`,
      subject: "Confirmação de Cadastro",
      to: email,
    });

    if (!emailSent.accepted) {
      throw new Error("Erro ao enviar email");
    }

    const userAndRoleAssociated = await db.transaction(async (tx) => {
      const [userCreated] = await tx
        .insert(users)
        .values({
          id: randomUUID(),
          email: email,
          name: name,
          product: product ?? null,
          password: null,
          emailVerified: new Date(),
          createPasswordToken,
          amount: amount,
        })
        .returning();

      if (!userCreated) {
        throw new Error("Erro ao criar usuário");
      }

      if (role === "user") {
        const curriculumAssociated = await tx
          .insert(curriculums)
          .values({
            userId: userCreated.id,
            statusCurriculum: "waiting_docs",
          })
          .returning();

        if (!curriculumAssociated) {
          throw new Error("Erro ao criar curriculo");
        }
      }

      const [roleCreated] = await tx
        .insert(roles)
        .values({
          userId: userCreated?.id,
          name: role,
        })
        .returning();

      if (!roleCreated) {
        throw new Error("Erro ao criar perfil");
      }

      return {
        user: userCreated,
        role: roleCreated,
      };
    });

    if (!userAndRoleAssociated) {
      throw new Error("Erro ao criar usuário");
    }

    return { message: `Usuário criado.` };
  }
);
