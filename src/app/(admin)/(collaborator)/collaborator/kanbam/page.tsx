import React from "react";
import { getServerAuthSession } from "../../../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { ListContainer } from "@/components/kanbam/list-container";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Kanbam Colaborador",
  description: "Área do kanbam coladorador",
};
noStore();
export const revalidate = 0;

export default async function CollaboratorKanbam() {
  const data = await getServerAuthSession();

  if (data?.user.roleName !== "collaborator") {
    return (
      <RedirectUnauthorized message="Sem permissão para acessar essa página" />
    );
  }

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
        boardId={"1"}
        data={[
          {
            cards: [
              {
                id: "1",
                description: "Tarefas",
                title: "Tarefas",
              },
              {
                id: "2",
                description: "Tarefas",
                title: "Tarefas",
              },
            ],
            id: "1",
            title: "Aguardando documentação",
          },
          {
            cards: [
              {
                id: "1",
                description: "Tarefas",
                title: "Tarefas",
              },
              {
                id: "2",
                description: "Tarefas",
                title: "Tarefas",
              },
            ],
            id: "2",
            title: "Seleção",
          },
          {
            id: "3",
            title: "Fabricação",
            cards: [],
          },
          {
            id: "3",
            title: "Revisão",
            cards: [],
          },
          {
            id: "3",
            title: "Envio do currículo",
            cards: [],
          },
        ]}
      />
    </div>
  );
}
