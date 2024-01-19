import FormsTemplateStudent from "@/components/templates/forms-template-student";
import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";

export default async function FormsPage() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return RedirectUnauthorized();
  }

  if (data.user.hasSendCertification) {
    return <h2>sent</h2>;
  }

  return (
    <NoSSRWrapper>
      <FormsTemplateStudent />
    </NoSSRWrapper>
  );
}
