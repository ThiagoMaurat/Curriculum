import FormsTemplateStudent from "@/components/templates/forms-template-student";
import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import React from "react";
import { getServerAuthSession } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { redirect } from "next/navigation";

export default async function FormsPage() {
  const data = await getServerAuthSession();

  if (!data?.user) {
    return <RedirectUnauthorized />;
  }

  if (data.user.roleName !== "user") {
    redirect("/");
  }

  if (data.user.hasSendCertification) {
    redirect("/edit-form");
  }

  return (
    <NoSSRWrapper>
      <FormsTemplateStudent />
    </NoSSRWrapper>
  );
}
