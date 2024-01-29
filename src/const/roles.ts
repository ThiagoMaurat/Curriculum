import { Roles } from "@/server/db/types-schema";

export const RolesConst: Roles["name"][] = [
  "supervisor",
  "collaborator",
  "coordinator",
  "user",
];

type RolesConst = typeof RolesConst;

export const RolesConstSelect = [
  {
    value: "supervisor",
    label: "Supervisor",
  },
  {
    value: "collaborator",
    label: "Colaborador",
  },
  {
    value: "coordinator",
    label: "Coordenador",
  },
  {
    value: "user",
    label: "Usuário",
  },
];
