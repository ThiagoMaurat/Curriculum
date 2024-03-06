import React from "react";
import { getServerAuthSession } from "../../../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { ListContainer } from "@/components/kanbam/list-container";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { listCoordinatorKanbamAction } from "@/server/action/list-coordinator-kanbam";

noStore();
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_PUBLIC_APP_URL ?? ""),
  title: "Admin - Kanbam Coordenador",
  description: "Área do kanbam Coordenador",
};

export default async function CoordinatorKanbam() {
  const data = await getServerAuthSession();

  if (data?.user.roleName !== "coordinator") {
    return (
      <RedirectUnauthorized message="Sem permissão para acessar essa página" />
    );
  }

  const { data: listCoordinatorKanbam, serverError } =
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
            cards: listCoordinatorKanbam?.studentsWaitingDocs,
            title: "Aguardando documentação",
          },
          {
            id: "2",
            cards: listCoordinatorKanbam?.studentsSelection,
            title: "Seleção",
          },
          {
            id: "3",
            title: "Fabricação",
            cards: listCoordinatorKanbam?.studentsFabrication,
          },
          {
            id: "4",
            title: "Revisão",
            cards: listCoordinatorKanbam?.studentsRevision,
          },
          {
            id: "5",
            title: "Envio do currículo",
            cards: listCoordinatorKanbam?.studentsCurriculumSend,
          },
        ]}
      />
    </div>
  );
}
