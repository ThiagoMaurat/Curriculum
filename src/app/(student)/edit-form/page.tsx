import React from "react";
import { getServerAuthSession } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import EditFormTemplate from "@/components/templates/edit-student-curriculum";
import { type Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/server/db/drizzle";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Edição de formulário",
  description: "Edição de formulário de envio de currículo",
};

noStore();
export const revalidate = 0;
export default async function EditForm() {
  const data = await getServerAuthSession();

  if (!data?.user) {
    return <RedirectUnauthorized />;
  }

  const [dataUserCertificate] = await db.query.curriculums.findMany({
    where(fields, operators) {
      return operators.eq(fields.userId, data?.user.id);
    },
    with: {
      certifications: true,
    },
  });

  if (!dataUserCertificate) {
    return (
      <RedirectUnauthorized message="Não foi possível carregar os dados" />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Editar Currículo</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <EditFormTemplate data={dataUserCertificate} />
      </CardContent>
    </Card>
  );
}
