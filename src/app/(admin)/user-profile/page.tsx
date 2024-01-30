import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { makeListUserByAdminFactory } from "@/server/factories/make-list-user-by-admin";
import { paramsSchema } from "@/validators/params-schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileAdminTemplate from "@/components/templates/profile-admin-template";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { type Metadata } from "next";
interface UserProfileProps {
  searchParams: {
    limit: string;
    page: string;
    sort: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Perfil do aluno",
  description: "Área do administrador",
};

noStore();
export const revalidate = 0;
export default async function UserProfile({ searchParams }: UserProfileProps) {
  const { limit, page, sort } = searchParams;
  const listUser = makeListUserByAdminFactory();

  const params = paramsSchema.parse({
    limit,
    page,
    sort,
  });

  const dataListUser = await listUser.execute({
    ...params,
  });

  if (!dataListUser) {
    return (
      <RedirectUnauthorized message="Erro ao carregar os dados dos alunos" />
    );
  }

  return (
    <Card className="max-w-[1000px] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Perfil dos Alunos</CardTitle>
      </CardHeader>

      <CardContent>
        <ProfileAdminTemplate data={dataListUser} />
      </CardContent>
    </Card>
  );
}
