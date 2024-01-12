import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import FormsTemplate from "@/components/templates/forms-template-admin";
import React from "react";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth";
import RedirectUnauthorized from "@/components/redirect-unauthorized";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Formulário",
  description: "Formulário de envio de currículo",
};

export default async function FormsPage() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return <RedirectUnauthorized />;
  }

  return (
    <NoSSRWrapper>
      <FormsTemplate />
    </NoSSRWrapper>
  );
}
