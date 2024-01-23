import { makeGetFormAlreadySentUserFactory } from "@/server/factories/make-get-form-already-sent-user-factory";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import EditFormTemplate from "@/components/templates/edit-form";

export default async function EditForm() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return RedirectUnauthorized();
  }

  const userCertificateData = makeGetFormAlreadySentUserFactory();

  const dataUserCertificate = await userCertificateData.execute({
    userId: data?.user.id,
  });

  return <EditFormTemplate />;
}
