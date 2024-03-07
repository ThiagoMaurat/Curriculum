import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import { getServerAuthSession } from "../../../../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import { FormsCollaboratorCreateCurriculum } from "@/components/templates/forms-collaborator-create-curriculum";
import { listTodoCurriculumByCollaborator } from "@/server/action/list-todo-curriculum-by-collaborator";
import { env } from "../../../../../../../env.mjs";

interface TodoCurriculumByCollaboratorProps {
  params: {
    id: string;
  };
}

noStore();
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin Colaborador - Elaborar Currículo",
  description: "Área do administrador",
};

export default async function TodoCurriculumByCollaborator({
  params,
}: TodoCurriculumByCollaboratorProps) {
  const data = await getServerAuthSession();
  const [paramsId] = params.id;

  if (!data?.user || data?.user.roleName !== "collaborator") {
    return <RedirectUnauthorized message="Usuário sem permissão" />;
  }

  if (!params.id || isNaN(+paramsId) || !data.user.roleName) {
    return <RedirectUnauthorized message="Parâmetros inválidos" />;
  }

  const { data: listTodoCurriculum, serverError } =
    await listTodoCurriculumByCollaborator({
      collaboratorId: data.user.id,
      curriculumId: +paramsId,
      roleName: data.user.roleName,
    });

  if (serverError || !listTodoCurriculum?.collaboratorCurriculum) {
    return (
      <RedirectUnauthorized message="Erro ao carregar os dados do currículo" />
    );
  }

  return (
    <NoSSRWrapper>
      <FormsCollaboratorCreateCurriculum
        data={listTodoCurriculum.collaboratorCurriculum}
      />
    </NoSSRWrapper>
  );
}
