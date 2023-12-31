import { NoSSRWrapper } from "@/hooks/no-ssr-wrapper";
import FormsTemplate from "@/templates/forms-template";
import React from "react";

export default function FormsPage() {
  return (
    <NoSSRWrapper>
      <FormsTemplate />
    </NoSSRWrapper>
  );
}
