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
import { ExtracurricularActivitiesConst } from "@/const/extracurricular-activities";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ModalViewCertificates from "../ModalViewCertificates";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface ProfessionalExperienceProps {
  data: ListTodoCurriculumByCollaborator;
}

export default function ProfessionalExperience({
  data,
}: ProfessionalExperienceProps) {
  const { control, watch } = useFormContext<CurriculumFormInput>();

  const fieldProfessionalExperience = useFieldArray<
    CurriculumFormInput,
    "professionalExperience"
  >({
    control: control,
    name: "professionalExperience",
  });

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          Atuação Profissional{" "}
          <ModalViewCertificates data={data?.certifications} />
        </CardTitle>
        <CardDescription>
          Insira sua experiência profissional e informações adicionais.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {fieldProfessionalExperience.fields.map((field, index) => (
          <div
            className="w-full flex flex-col gap-2"
            key={`fieldProfessionalExperience-${index}`}
          >
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={control}
                name={`professionalExperience.${index}.initialYear` as const}
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
                name={`professionalExperience.${index}.finalYear` as const}
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
                name={`professionalExperience.${index}.subcategory` as const}
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
                            {ExtracurricularActivitiesConst?.map((category) => (
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
                name={`professionalExperience.${index}.certifications` as const}
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
                                key={`${certifications.key}-${certifications.userId}-professionalExperience`}
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
              name={`professionalExperience.${index}.description` as const}
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
                        `professionalExperience.${index}.description` as const
                      ) && (
                        <p className="text-xs text-muted-foreground w-full text-end">
                          {
                            watch(
                              `professionalExperience.${index}.description` as const
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

            {fieldProfessionalExperience.fields.length > 1 &&
              fieldProfessionalExperience.fields.length - 1 !== index && (
                <Separator orientation="horizontal" className="my-3" />
              )}
          </div>
        ))}

        <div className="w-full mt-4 flex sm:flex-row flex-col gap-2">
          <Button
            onClick={() =>
              fieldProfessionalExperience.append({
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

          {fieldProfessionalExperience.fields.length > 0 && (
            <Button
              onClick={() =>
                fieldProfessionalExperience.remove(
                  fieldProfessionalExperience.fields.length - 1
                )
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
