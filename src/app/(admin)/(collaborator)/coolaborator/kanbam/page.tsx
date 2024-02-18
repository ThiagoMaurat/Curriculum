import React from "react";
import { getServerAuthSession } from "../../../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { ListContainer } from "@/components/kanbam/list-container";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { listCollaboratorKanbamAction } from "@/server/action/list-collaborator-kanbam";

noStore();
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Kanbam Colaborador",
  description: "Área do kanbam coladorador",
};

export default async function CollaboratorKanbam() {
  const data = await getServerAuthSession();

  if (data?.user.roleName !== "collaborator") {
    return (
      <RedirectUnauthorized message="Sem permissão para acessar essa página" />
    );
  }

  const { data: listCollaboratorKanbam, serverError } =
    await listCollaboratorKanbamAction({
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
            title: "Fabricação",
            cards: listCollaboratorKanbam?.studentsFabrication,
          },
        ]}
      />
    </div>
  );
}
