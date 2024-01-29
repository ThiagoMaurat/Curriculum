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
import SecondStepEditForm from "../forms/curriculum-edit-form/second-step";
import { EditFormStudent } from "../forms/curriculum-edit-form/schema";
import { Button } from "../ui/button";

interface EditFormTemplateProps {
  data: GetFormAlreadySenteUserCaseOutput;
}

export default function EditFormTemplate(props: EditFormTemplateProps) {
  const { data } = props;

  const form = useForm<EditFormStudent>({
    defaultValues: {
      fullName: data.fullName ?? "",
      address: data.address ?? "",
      birthday: data.birthday ?? undefined,
      CPF: data.CPF ?? "",
      CRM: data.CRM ?? "",
      email: data.email ?? "",
      fathersName: data.fathersName ?? "",
      lattes: data.lattes ?? "",
      selfDescription: data.selfDescription ?? "",
      phone: data.phone ?? "",
      mothersName: data.mothersName ?? "",
      identityDocument: data.identityDocument ?? "",
      initialCourseDate: data.initialCourseDate ?? undefined,
      finalCourseDate: data.finalCourseDate ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Dados pessoais</AccordionTrigger>
            <AccordionContent>
              <FirstStepEditForm />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Certificados</AccordionTrigger>
            <AccordionContent>
              <SecondStepEditForm data={data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full mt-4" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
