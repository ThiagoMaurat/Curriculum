import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import FormsTemplate from "@/templates/forms-template";
import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Formulário",
  description: "Formulário de envio de currículo",
};

export default function FormsPage() {
  return (
    <NoSSRWrapper>
      <FormsTemplate />
    </NoSSRWrapper>
  );
}
