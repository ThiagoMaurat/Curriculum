import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileAdminTemplate from "@/components/templates/profile-admin-template";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { type Metadata } from "next";
import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import { getServerAuthSession } from "../../../../auth";
import { notFound } from "next/navigation";
import { listUsersAction } from "@/server/action/list-users-by-admin";
import { InputSearch } from "@/components/ui/field-search";
import { ParamsType } from "@/validators/params-schema";
import { env } from "../../../../env.mjs";
interface UserProfileProps {
  searchParams: ParamsType;
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Perfil do aluno",
  description: "Área do administrador",
};

noStore();
export const revalidate = 0;
export default async function UserProfile({ searchParams }: UserProfileProps) {
  const { limit, page, sort, search } = searchParams;
  const data = await getServerAuthSession();

  const { data: dataListUser } = await listUsersAction({
    limit,
    page,
    sort,
    search,
  });

  if (!data?.user || data?.user.roleName === "user") {
    return <RedirectUnauthorized message="Usuário sem permissão" />;
  }

  if (!dataListUser?.user) {
    return notFound();
  }

  return (
    <Card className="max-w-[1000px] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1 flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-2xl">Perfil dos Alunos</CardTitle>

        <InputSearch className="max-w-64" placeholder="Pesquisar" />
      </CardHeader>

      <CardContent>
        <NoSSRWrapper>
          <ProfileAdminTemplate data={dataListUser} />
        </NoSSRWrapper>
      </CardContent>
    </Card>
  );
}
