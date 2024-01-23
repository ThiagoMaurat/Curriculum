import { makeGetFormAlreadySentUserFactory } from "@/server/factories/make-get-form-already-sent-user-factory";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import EditFormTemplate from "@/components/templates/edit-form";
import { type Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Edição de formulário",
  description: "Edição de formulário de envio de currículo",
};

export default async function EditForm() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return RedirectUnauthorized();
  }

  const userCertificateData = makeGetFormAlreadySentUserFactory();

  const dataUserCertificate = await userCertificateData.execute({
    userId: data?.user.id,
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="p-4 space-y-1 ">
        <CardTitle className="text-2xl">Editar Currículo</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <EditFormTemplate data={dataUserCertificate} />
      </CardContent>
    </Card>
  );
}
