"use client";

import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputFieldMask } from "@/components/ui/input-mask";
import { Textarea } from "@/components/ui/textarea";
import { ptBR } from "date-fns/locale";
import React from "react";
import { EditFormStudent } from "./schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { updateCurriculumAction } from "@/server/action/update-curriculum";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Curriculum, Certification } from "@/server/db/types-schema";

interface EditFormTemplateProps {
  data: {} & Curriculum & {
      certifications: Certification[];
    };
}

export default function FirstStepEditForm(props: EditFormTemplateProps) {
  const { data } = props;
  const { data: session } = useSession();
  const { toast } = useToast();

  const methods = useForm<EditFormStudent>({
    defaultValues: {
      fullName: data?.fullName ?? "",
      address: data?.address ?? "",
      birthday: data?.birthday ?? undefined,
      CPF: data?.CPF ?? "",
      CRM: data?.CRM ?? "",
      email: data?.email ?? "",
      fathersName: data?.fathersName ?? "",
      lattes: data?.lattes ?? "",
      selfDescription: data?.selfDescription ?? "",
      phone: data?.phone ?? "",
      mothersName: data?.mothersName ?? "",
      identityDocument: data?.identityDocument ?? "",
      initialCourseDate: data?.initialCourseDate ?? undefined,
      finalCourseDate: data?.finalCourseDate ?? undefined,
    },
  });

  const onSubmit = async (dataForm: EditFormStudent) => {
    if (!session?.user?.id) {
      return;
    }

    const { serverError, data } = await updateCurriculumAction({
      ...dataForm,
      userId: session?.user?.id,
    });

    if (serverError) {
      toast({
        title: "Erro",
        description: serverError || "Erro ao salvar certificado.",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: data?.message || "Certificado salvo com sucesso.",
      duration: 3000,
    });
  };

  return (
    <Form {...methods}>
      <form className="grid gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Insira um nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="fathersName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do pai</FormLabel>
              <FormControl>
                <Input placeholder="Insira o nome do pai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="mothersName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do mãe</FormLabel>
              <FormControl>
                <Input placeholder="Insira o nome da mãe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  labels={{
                    labelMonthDropdown: () => "Mês",
                    labelYearDropdown: () => "Ano",
                  }}
                  onSelect={field.onChange as any}
                  selected={field.value}
                  label={field.value}
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    caption_label: "hidden",
                    dropdown_icon: "hidden",
                    dropdown_month: "flex gap-3",
                    dropdown_year: "w-full flex justify-between gap-3",
                    dropdown: "w-full",
                    caption_dropdowns: "space-y-2 text-md",
                  }}
                  locale={ptBR}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="initialCourseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de início do curso</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  labels={{
                    labelMonthDropdown: () => "Mês",
                    labelYearDropdown: () => "Ano",
                  }}
                  onSelect={field.onChange as any}
                  selected={field.value}
                  label={field.value}
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    caption_label: "hidden",
                    dropdown_icon: "hidden",
                    dropdown_month: "flex gap-3",
                    dropdown_year: "w-full flex justify-between gap-3",
                    dropdown: "w-full",
                    caption_dropdowns: "space-y-2 text-md",
                  }}
                  locale={ptBR}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="finalCourseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data final do curso</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  labels={{
                    labelMonthDropdown: () => "Mês",
                    labelYearDropdown: () => "Ano",
                  }}
                  onSelect={field.onChange as any}
                  selected={field.value}
                  label={field.value}
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    caption_label: "hidden",
                    dropdown_icon: "hidden",
                    dropdown_month: "flex gap-3",
                    dropdown_year: "w-full flex justify-between gap-3",
                    dropdown: "w-full",
                    caption_dropdowns: "space-y-2 text-md",
                  }}
                  locale={ptBR}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="identityDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento de Identidade</FormLabel>
              <FormControl>
                <InputFieldMask
                  mask={"99.999.999-9"}
                  placeholder="Insira o documento de identidade"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="CRM"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CRM (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o CRM acompanhado do estado"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="CPF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <InputFieldMask
                  mask={"999.999.999-99"}
                  placeholder="Insira o CPF"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <InputFieldMask
                  mask={"(99) 99999-9999"}
                  placeholder="Insira o telefone"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Insira o endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Insira o endereço de email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="lattes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currículo Lattes</FormLabel>
              <FormControl>
                <Input placeholder="Insira o link do Lattes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={"selfDescription"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Você possui algum item que gostaria de destacar na sua biografia
                inicial? (Opcional)
              </FormLabel>
              <FormControl>
                <React.Fragment>
                  <Textarea
                    className="min-h-[90px]"
                    maxLength={400}
                    placeholder="Destaque aqui algum cargo de
                  representação, organização de evento ou alguma certificação que mereça destaque
                  na biografia inicial"
                    {...field}
                  />

                  {methods.watch("selfDescription") && (
                    <p className="text-xs text-muted-foreground w-full text-end">
                      {methods.watch("selfDescription")?.length}/ 400
                    </p>
                  )}
                </React.Fragment>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-4"
          isLoading={methods.formState.isSubmitting}
          disabled={methods.formState.isSubmitting}
          type="submit"
        >
          Atualizar Currículo
        </Button>
      </form>
    </Form>
  );
}
