import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { getServerAuthSession } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { CreateUserAdminForm } from "@/components/forms/create-user-admin";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin - Criar usuário",
  description: "Área do administrador",
};

export default async function CreateUserSupervisor() {
  const data = await getServerAuthSession();

  if (
    data?.user.roleName !== "supervisor" &&
    data?.user.roleName !== "coordinator"
  ) {
    return <RedirectUnauthorized message="Sem permissão" />;
  }

  return (
    <Card className="max-w-[700px] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Criar Usuário</CardTitle>
      </CardHeader>

      <CardContent>
        <CreateUserAdminForm />
      </CardContent>
    </Card>
  );
}
