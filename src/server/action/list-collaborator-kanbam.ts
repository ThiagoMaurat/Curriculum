"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "../db/drizzle";
import { z } from "zod";

export const listCollaboratorKanbamAction = action(
  z.object({
    roleName: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
  }),
  async ({ roleName }) => {
    noStore();

    if (roleName !== "collaborator") {
      throw new Error("Sem permissão");
    }

    const studentsWaitingDocs = await db.query.users
      .findMany({
        with: {
          curriculums: true,
          certifications: true,
          roles: {
            columns: {
              name: true,
            },
            where(fields, { inArray }) {
              return inArray(fields.name, ["user"]);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "waiting_docs");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          product: true,
          amount: true,
          statusCurriculum: true,
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item.roles.length > 0;
        });
      });

    const studentsSelection = await db.query.users
      .findMany({
        with: {
          curriculums: true,
          certifications: true,
          roles: {
            where(fields, { inArray }) {
              return inArray(fields.name, ["user"]);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "selection");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          product: true,
          amount: true,
          statusCurriculum: true,
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item.roles.length > 0;
        });
      });

    const studentsFabrication = await db.query.users
      .findMany({
        with: {
          curriculums: true,
          certifications: true,
          roles: {
            where(fields, { inArray }) {
              return inArray(fields.name, ["user"]);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "fabrication");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          product: true,
          amount: true,
          statusCurriculum: true,
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item.roles.length > 0;
        });
      });

    const studentsRevision = await db.query.users
      .findMany({
        with: {
          curriculums: true,
          certifications: true,
          roles: {
            where(fields, { inArray }) {
              return inArray(fields.name, ["user"]);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "revision");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          product: true,
          amount: true,
          statusCurriculum: true,
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item.roles.length > 0;
        });
      });

    const studentsCurriculumSend = await db.query.users
      .findMany({
        with: {
          curriculums: true,
          certifications: true,
          roles: {
            where(fields, { inArray }) {
              return inArray(fields.name, ["user"]);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "curriculum_send");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          product: true,
          amount: true,
          statusCurriculum: true,
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item.roles.length > 0;
        });
      });

    revalidatePath("/edit-form");

    return {
      studentsWaitingDocs,
      studentsSelection,
      studentsFabrication,
      studentsRevision,
      studentsCurriculumSend,
    };
  }
);
