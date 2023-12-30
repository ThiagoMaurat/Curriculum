import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CurriculumFormInput } from "../type";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash } from "lucide-react";
import { Bibliography } from "@/const/bibliography";

export default function BibliographyCard() {
  const { control } = useFormContext<CurriculumFormInput>();

  const fieldBibliography = useFieldArray<CurriculumFormInput, "bibliography">({
    control: control,
    name: "bibliography",
  });

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Bibliografia</CardTitle>
        <CardDescription>
          Insira sua bibliografia e informações adicionais pertinentes.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full relative">
        {fieldBibliography.fields.map((field, index) => (
          <div
            className="relative w-max flex flex-col gap-2"
            key={`fieldBibliography-${index}`}
          >
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={control}
                name={`bibliography.${index}.year` as const}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira o ano do evneto"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`bibliography.${index}.type` as const}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        name={field.name}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Insira o tema associado"
                            onChange={field.onChange}
                          />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {Bibliography?.map((category) => (
                              <SelectItem
                                key={`${field.name}-${category}`}
                                value={String(category)}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`bibliography.${index}.description` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[90px]"
                      placeholder="Insira uma descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fieldBibliography.fields.length > 1 &&
              fieldBibliography.fields.length - 1 !== index && (
                <Separator orientation="horizontal" className="my-3" />
              )}
          </div>
        ))}

        <div className="w-full mt-4 flex sm:flex-row flex-col gap-2">
          <Button
            onClick={() =>
              fieldBibliography.append({
                description: "",
                type: "",
                year: new Date().getFullYear(),
              })
            }
            type="button"
            className="w-full"
          >
            <p>Adicionar</p>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          {fieldBibliography.fields.length > 1 && (
            <Button
              onClick={() =>
                fieldBibliography.remove(fieldBibliography.fields.length - 1)
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
      </CardContent>
    </Card>
  );
}
