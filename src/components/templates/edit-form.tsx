"use client";
import { GetFormAlreadySenteUserCaseOutput } from "@/server/use-cases/get-form-already-sent";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FirstStepEditForm from "../forms/curriculum-edit-form/first-step";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

interface EditFormTemplateProps {
  data: GetFormAlreadySenteUserCaseOutput;
}

export default function EditFormTemplate(props: EditFormTemplateProps) {
  const { data } = props;

  const form = useForm({
    defaultValues: data,
  });

  return (
    <Form {...form}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Dados pessoais</AccordionTrigger>
          <AccordionContent>
            <FirstStepEditForm data={data} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Certificados</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Form>
  );
}
