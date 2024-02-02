import { makeGetFormAlreadySentUserFactory } from "@/server/factories/make-get-form-already-sent-user-factory";
import React from "react";
import { getServerAuthSession } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import EditFormTemplate from "@/components/templates/edit-student-curriculum";
import { type Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";

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

  const userCertificateData = makeGetFormAlreadySentUserFactory();

  const dataUserCertificate = await userCertificateData.execute({
    userId: data?.user.id,
  });

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
