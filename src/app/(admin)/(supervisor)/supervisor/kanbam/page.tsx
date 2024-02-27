import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { getServerAuthSession } from "../../../../../../auth";
import { Metadata } from "next/types";
import { listSupervisorUsers } from "@/server/action/list-supervisor-kanbam";
import { ListContainer } from "@/components/kanbam/list-container";

noStore();
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Kanbam Supervisor",
  description: "Área do kanbam Supervisor",
};

export default async function KanbamSupervisor() {
  const data = await getServerAuthSession();

  if (data?.user.roleName !== "supervisor") {
    return (
      <RedirectUnauthorized message="Sem permissão para acessar essa página" />
    );
  }

  const { data: listSupervisorKanbam, serverError } = await listSupervisorUsers(
    {
      roleName: data?.user.roleName,
    }
  );

  if (serverError || !listSupervisorKanbam) {
    return notFound();
  }

  return (
    <div className="h-[calc(100vh-104px)] w-full">
      <ListContainer
        data={[
          {
            id: "1",
            cards: listSupervisorKanbam?.studentsWaitingDocs,
            title: "Aguardando documentação",
          },
          {
            id: "2",
            cards: listSupervisorKanbam?.studentsSelection,
            title: "Seleção",
          },
          {
            id: "3",
            title: "Fabricação",
            cards: listSupervisorKanbam?.studentsFabrication,
          },
          {
            id: "4",
            title: "Revisão",
            cards: listSupervisorKanbam?.studentsRevision,
          },
          {
            id: "5",
            title: "Envio do currículo",
            cards: listSupervisorKanbam?.studentsCurriculumSend,
          },
        ]}
      />
    </div>
  );
}
