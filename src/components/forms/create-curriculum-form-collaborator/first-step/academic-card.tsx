import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcademicEducationConst } from "@/const/academic-education-category";
import { Textarea } from "@/components/ui/textarea";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import ModalViewCertificates from "../ModalViewCertificates";

interface AcademicCardProps {
  data: ListTodoCurriculumByCollaborator;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

export default function AcademicCard({
  data,
  currentStep,
  setCurrentStep,
}: AcademicCardProps) {
  const { control, watch, setValue } = useFormContext<CurriculumFormInput>();

  const fieldAcademicEducation = useFieldArray<CurriculumFormInput, "data">({
    control: control,
    name: "data",
  });

  useEffect(() => {
    if (fieldAcademicEducation?.fields?.[currentStep]) {
      setValue("data", fieldAcademicEducation?.fields?.[currentStep]?.data);
    }
  }, [currentStep, fieldAcademicEducation?.fields, setValue]);

  if (fieldAcademicEducation?.fields?.[currentStep]) {
    //todo: add component if there is data added
  }

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          Formação Acadêmica
          <ModalViewCertificates data={data?.certifications} />
        </CardTitle>
        <CardDescription>
          Insira sua formação acadêmica e informações adicionais.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {fieldAcademicEducation.fields.map((field, index) => (
          <div
            className="w-full flex flex-col gap-2"
            key={`fieldAcademicEducation-${index}`}
          >
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={control}
                name={`data.${index}.initialYear` as const}
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
                name={`data.${index}.finalYear` as const}
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
                name={`data.${index}.subcategory` as const}
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
                            {AcademicEducationConst?.map((category) => (
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
                name={`data.${index}.certifications` as const}
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
                                key={`${certifications.key}-${certifications.userId}`}
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
              name={`data.${index}.description` as const}
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

                      {watch(`data.${index}.description` as const) && (
                        <p className="text-xs text-muted-foreground w-full text-end">
                          {watch(`data.${index}.description` as const).length}/
                          400
                        </p>
                      )}
                    </React.Fragment>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
