import FormsTemplateStudent from "@/components/templates/forms-template-student";
import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import React from "react";

export default function FormsPage() {
  return (
    <NoSSRWrapper>
      <FormsTemplateStudent />
    </NoSSRWrapper>
  );
}
