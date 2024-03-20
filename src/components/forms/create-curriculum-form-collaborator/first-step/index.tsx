import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useCallback, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { watch } from "fs";

interface FirstStepProps {
  data: ListTodoCurriculumByCollaborator;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

export default function FirstStep(props: FirstStepProps) {
  const { setCurrentStep, currentStep, data } = props;

  const { trigger, control, watch, clearErrors, setValue } =
    useFormContext<CurriculumFormInput>();

  const fieldData = useFieldArray<CurriculumFormInput, "data">({
    control: control,
    name: "data",
  });

  const [firstStepIteration, setFirstStepIteration] = React.useState(0);

  const addFieldDataArray = useCallback(async () => {
    const [validateForm] = await Promise.all([
      trigger(`data.${firstStepIteration}`),
    ]);
    console.log(firstStepIteration, fieldData?.fields?.length);

    if (validateForm && firstStepIteration + 1 === fieldData?.fields?.length) {
      fieldData.append({
        description: watch("data")[firstStepIteration].description,
        subcategory: watch("data")[firstStepIteration]?.subcategory,
        finalYear: watch("data")[firstStepIteration]?.finalYear,
        initialYear: watch("data")[firstStepIteration]?.initialYear,
        certifications: watch("data")[firstStepIteration]?.certifications,
      });

      // Atualiza os valores do objeto no índice do passo atual
      setValue(`data.${firstStepIteration + 1}`, {
        description: "",
        subcategory: "",
        finalYear: new Date().getFullYear(),
        initialYear: new Date().getFullYear(),
        certifications: "",
      });

      setFirstStepIteration(firstStepIteration + 1);

      clearErrors();
    }

    if (validateForm && firstStepIteration + 1 !== fieldData?.fields?.length) {
      console.log("neoif");
      fieldData.update(firstStepIteration, {
        description: watch("data")[firstStepIteration].description,
        subcategory: watch("data")[firstStepIteration]?.subcategory,
        finalYear: watch("data")[firstStepIteration]?.finalYear,
        initialYear: watch("data")[firstStepIteration]?.initialYear,
        certifications: watch("data")[firstStepIteration]?.certifications,
      });

      setFirstStepIteration(firstStepIteration + 1);
    }
  }, [trigger, firstStepIteration, fieldData, watch, setValue, clearErrors]);

  const backFieldArray = useCallback(() => {
    if (firstStepIteration === 0) {
      return;
    }

    clearErrors();
    setFirstStepIteration((prev) => prev - 1);
  }, [firstStepIteration, clearErrors, setFirstStepIteration]);

  console.log(watch("data"), firstStepIteration);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                Criar seção
                <ModalViewCertificates data={data?.certifications} />
              </CardTitle>

              <p>{`${firstStepIteration + 1}/${fieldData?.fields?.length}`}</p>
            </div>
            <CardDescription>
              Insira sua formação acadêmica e informações adicionais.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            {fieldData.fields.length >= 0 && (
              <div
                className="w-full flex flex-col gap-2"
                key={`fieldData-${firstStepIteration}`}
              >
                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={control}
                    name={`data.${firstStepIteration}.initialYear` as const}
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
                    name={`data.${firstStepIteration}.finalYear` as const}
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
                    name={`data.${firstStepIteration}.subcategory` as const}
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
                    name={`data.${firstStepIteration}.certifications` as const}
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
                  name={`data.${firstStepIteration}.description` as const}
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
                            `data.${firstStepIteration}.description` as const
                          ) && (
                            <p className="text-xs text-muted-foreground w-full text-end">
                              {
                                watch(
                                  `data.${firstStepIteration}.description` as const
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            className="self-center align-middle w-full"
            variant="default"
            onClick={addFieldDataArray}
          >
            Cadastrar Próximo
          </Button>

          <Button
            className="self-center align-middle w-full"
            variant="default"
            onClick={backFieldArray}
            disabled={firstStepIteration === 0}
          >
            Voltar
          </Button>

          <Button
            type="submit"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Preview do PDF
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
