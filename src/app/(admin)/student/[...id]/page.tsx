import React from "react";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "../../../../../auth";
import { DrizzleUsersRepository } from "@/server/repositories/drizzle/user-drizzle-repository";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import ProfileByIdAdmin from "@/components/templates/profile-by-id-admin";

interface StudentByIdProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Perfil do aluno",
  description: "Área do administrador",
};
noStore();
export const revalidate = 0;
export default async function StudentById({ params }: StudentByIdProps) {
  const data = await getServerAuthSession();
  const [paramsId] = params.id;
  if (!data?.user || data?.user.roleName === "user") {
    return <RedirectUnauthorized message="Usuário sem permissão" />;
  }

  if (!params.id) {
    return (
      <RedirectUnauthorized message="Erro ao carregar os dados do aluno" />
    );
  }

  const userRepository = new DrizzleUsersRepository();
  const listUserById = await userRepository.listUserById(paramsId);

  if (!listUserById) {
    notFound();
  }

  return (
    <Card className="max-w-[1000px] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Registro Individual</CardTitle>
      </CardHeader>

      <CardContent>
        <ProfileByIdAdmin data={listUserById} />
      </CardContent>
    </Card>
  );
}
