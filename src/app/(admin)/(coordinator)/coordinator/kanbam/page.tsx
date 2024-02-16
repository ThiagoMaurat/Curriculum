import React from "react";
import { getServerAuthSession } from "../../../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { ListContainer } from "@/components/kanbam/list-container";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { listCoordinatorKanbamAction } from "@/server/action/list-collaborator-kanbam";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Kanbam Colaborador",
  description: "Área do kanbam coladorador",
};
noStore();
export const revalidate = 0;

export default async function CollaboratorKanbam() {
  const data = await getServerAuthSession();

  if (data?.user.roleName !== "coordinator") {
    return (
      <RedirectUnauthorized message="Sem permissão para acessar essa página" />
    );
  }

  const { data: listCollaboratorKanbam, serverError } =
    await listCoordinatorKanbamAction({
      roleName: data?.user.roleName,
    });

  if (serverError) {
    return notFound();
  }

  return (
    <div className="h-[calc(100vh-104px)] w-full">
      <ListContainer
        data={[
          {
            id: "1",
            cards: listCollaboratorKanbam?.studentsWaitingDocs,
            title: "Aguardando documentação",
          },
          {
            id: "2",
            cards: listCollaboratorKanbam?.studentsSelection,
            title: "Seleção",
          },
          {
            id: "3",
            title: "Fabricação",
            cards: listCollaboratorKanbam?.studentsFabrication,
          },
          {
            id: "4",
            title: "Revisão",
            cards: listCollaboratorKanbam?.studentsRevision,
          },
          {
            id: "5",
            title: "Envio do currículo",
            cards: listCollaboratorKanbam?.studentsCurriculumSend,
          },
        ]}
      />
    </div>
  );
}
