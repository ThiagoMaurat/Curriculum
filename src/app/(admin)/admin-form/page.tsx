import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import FormsTemplateAdmin from "@/components/templates/forms-template-admin";
import React from "react";
import { type Metadata } from "next";
import RedirectUnauthorized from "@/components/redirect-unauthorized";
import { getServerAuthSession } from "../../../../auth";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Área do admin",
  description: "Área do administrador",
};

export default async function FormsPage() {
  const data = await getServerAuthSession();

  if (!data?.user) {
    return <RedirectUnauthorized />;
  }

  return (
    <NoSSRWrapper>
      <FormsTemplateAdmin />
    </NoSSRWrapper>
  );
}
