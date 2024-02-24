import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CurriculumFormInput } from "../type";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CongressConst } from "@/const/congress";
import ModalViewCertificates from "../ModalViewCertificates";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface CongressProps {
  data: ListTodoCurriculumByCollaborator;
}

export default function Congress({ data }: CongressProps) {
  const { control, watch } = useFormContext<CurriculumFormInput>();

  const fieldCongress = useFieldArray<CurriculumFormInput, "eventsCongress">({
    control: control,
    name: "eventsCongress",
  });

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          Congressos e Eventos Científicos
          <ModalViewCertificates data={data?.certifications} />
        </CardTitle>
        <CardDescription>
          Insira seus congressos e eventos acadêmicos realizados.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {fieldCongress.fields.map((field, index) => (
          <div
            className="w-full flex flex-col gap-2"
            key={`fieldCongress-${index}`}
          >
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={control}
                name={`eventsCongress.${index}.initialYear` as const}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ano Inicial</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira o ano inicial"
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
                name={`eventsCongress.${index}.finalYear` as const}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ano Final</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira o ano final"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={control}
                name={`eventsCongress.${index}.subcategory` as const}
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
                            {CongressConst?.map((category) => (
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

              <FormField
                control={control}
                name={`eventsCongress.${index}.certifications` as const}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Certificados</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        name={field.name}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Insira os certificados associados"
                            onChange={field.onChange}
                          />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {data?.certifications?.map((certifications) => (
                              <SelectItem
                                key={`${certifications.fileName}-${certifications.userId}`}
                                value={String(certifications?.url)}
                              >
                                {certifications.fileName}
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
              name={`eventsCongress.${index}.description` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <React.Fragment>
                      <Textarea
                        maxLength={400}
                        className="min-h-[90px]"
                        placeholder="Insira uma descrição"
                        {...field}
                      />

                      {watch(
                        `eventsCongress.${index}.description` as const
                      ) && (
                        <p className="text-xs text-muted-foreground w-full text-end">
                          {
                            watch(
                              `eventsCongress.${index}.description` as const
                            ).length
                          }
                          / 400
                        </p>
                      )}
                    </React.Fragment>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fieldCongress.fields.length > 1 &&
              fieldCongress.fields.length - 1 !== index && (
                <Separator orientation="horizontal" className="my-3" />
              )}
          </div>
        ))}

        <div className="w-full mt-4 flex sm:flex-row flex-col gap-2">
          <Button
            onClick={() =>
              fieldCongress.append({
                description: "",
                subcategory: "",
                initialYear: new Date().getFullYear(),
                finalYear: new Date().getFullYear(),
                certifications: "",
              })
            }
            type="button"
            className="w-full"
          >
            <p>Adicionar</p>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          {fieldCongress.fields.length > 1 && (
            <Button
              onClick={() =>
                fieldCongress.remove(fieldCongress.fields.length - 1)
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
