"use client";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import { InputFieldMask } from "@/components/ui/input-mask";
import { Textarea } from "@/components/ui/textarea";
import { FormStudent } from "../type";

interface FirstStepStudentProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FirstStepStudent(props: FirstStepStudentProps) {
  const { setCurrentStep } = props;

  const { control, trigger, watch } = useFormContext<FormStudent>();

  const validateFirstStepStudent = async () => {
    const [
      name,
      presentationName,
      fathersName,
      mothersName,
      birthday,
      identityDocument,
      CRM,
      CPF,
      phone,
      address,
      email,
      lattes,
      selfDescription,
    ] = await Promise.all([
      trigger("name"),
      trigger("presentationName"),
      trigger("fathersName"),
      trigger("mothersName"),
      trigger("birthday"),
      trigger("identityDocument"),
      trigger("CRM"),
      trigger("CPF"),
      trigger("phone"),
      trigger("address"),
      trigger("email"),
      trigger("lattes"),
      trigger("selfDescription"),
    ]);

    if (
      name &&
      presentationName &&
      fathersName &&
      mothersName &&
      birthday &&
      identityDocument &&
      CRM &&
      CPF &&
      phone &&
      address &&
      email &&
      lattes &&
      selfDescription
    ) {
      setCurrentStep(1);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Dados Pessoais</CardTitle>
        <CardDescription>
          Insira os seus dados pessoais que ficarão visiveis na primeira página
          do currículo
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Insira um nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="presentationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de Apresentação</FormLabel>
              <FormControl>
                <Input placeholder="Insira um nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name="CRM"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CRM</FormLabel>
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name={"selfDescription"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descreva sua carreira e trajetória</FormLabel>
              <FormControl>
                <React.Fragment>
                  <Textarea
                    className="min-h-[90px]"
                    maxLength={400}
                    placeholder="Insira uma descrição"
                    {...field}
                  />

                  {watch("selfDescription") && (
                    <p className="text-xs text-muted-foreground w-full text-end">
                      {watch("selfDescription").length}/ 400
                    </p>
                  )}
                </React.Fragment>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" onClick={validateFirstStepStudent}>
          Próximo passo
        </Button>
      </CardContent>
    </Card>
  );
}
