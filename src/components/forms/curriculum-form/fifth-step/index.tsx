import React from "react";
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
import { useFieldArray, useFormContext } from "react-hook-form";
import { CurriculumFormInput } from "../type";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash } from "lucide-react";

interface FifthStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FifthStep(props: FifthStepProps) {
  const { control } = useFormContext<CurriculumFormInput>();

  const fieldPdfLink = useFieldArray<CurriculumFormInput, "pdfLink">({
    control: control,
    name: "pdfLink",
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Curriculos</CardTitle>
        <CardDescription>Carregue seus currículos a seguir</CardDescription>
      </CardHeader>

      <CardContent className="grid">
        {/* TODO: add the component field file instead of input field */}
        <p className="text-md text-red-500">
          Apenas para teste o link do pdf no quinto step:
        </p>

        {fieldPdfLink.fields.map((field, index) => (
          <div className="w-full flex flex-col gap-2" key={`pdfLink-${index}`}>
            <FormField
              control={control}
              name={`pdfLink.${index}.link` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link PDF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o link do certificado"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fieldPdfLink.fields.length > 1 &&
              fieldPdfLink.fields.length - 1 !== index && (
                <Separator orientation="horizontal" className="my-3" />
              )}
          </div>
        ))}

        <div className="w-full mt-4 flex sm:flex-row flex-col gap-2">
          <Button
            onClick={() =>
              fieldPdfLink.append({
                link: "",
              })
            }
            type="button"
            className="w-full"
          >
            <p>Adicionar</p>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          {fieldPdfLink.fields.length > 1 && (
            <Button
              onClick={() =>
                fieldPdfLink.remove(fieldPdfLink.fields.length - 1)
              }
              type="button"
              className="w-full"
              variant="destructive"
            >
              <p>Remover</p>
              <Trash className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        <Button className="mt-2" type="submit">
          Finalizar
        </Button>
      </CardContent>
    </Card>
  );
}
