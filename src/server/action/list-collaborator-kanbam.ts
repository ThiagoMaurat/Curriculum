"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "../db/drizzle";
import { z } from "zod";

export const listCoordinatorKanbamAction = action(
  z.object({
    roleName: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
  }),
  async ({ roleName }) => {
    noStore();

    if (roleName !== "coordinator") {
      throw new Error("Sem permissão");
    }

    const studentsWaitingDocs = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },

        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "waiting_docs");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
        });
      });

    const studentsSelection = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          collaborators: {
            columns: {
              name: true,
              email: true,
            },
          },
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "selection");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
        });
      });

    const studentsFabrication = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          collaborators: true,
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "fabrication");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
        });
      });

    const studentsRevision = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          collaborators: true,
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "revision");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
        });
      });

    const studentsCurriculumSend = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          collaborators: true,
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },
        where(fields, operators) {
          return operators.eq(fields.statusCurriculum, "fabrication");
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
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
