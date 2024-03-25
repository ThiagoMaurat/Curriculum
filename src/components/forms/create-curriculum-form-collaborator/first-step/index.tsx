import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { Button } from "@/components/ui/button";
import { ITopic, Topic } from "@/const/themes/topic";
import { AcademicEducationPatternMatching } from "@/const/themes";
import PDFView from "../pdf-view";

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

    if (validateForm && firstStepIteration + 1 === fieldData?.fields?.length) {
      fieldData.append({
        topic: watch("data")[firstStepIteration].topic,
        description: watch("data")[firstStepIteration].description,
        subcategory: watch("data")[firstStepIteration]?.subcategory,
        finalYear: watch("data")[firstStepIteration]?.finalYear,
        initialYear: watch("data")[firstStepIteration]?.initialYear,
        certifications: watch("data")[firstStepIteration]?.certifications,
      });

      // Atualiza os valores do objeto no índice do passo atual
      setValue(`data.${firstStepIteration + 1}`, {
        topic: "",
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
      fieldData.update(firstStepIteration, {
        topic: watch("data")[firstStepIteration].topic,
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

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                Criar seção
              </CardTitle>

              <p>{`${firstStepIteration + 1}/${fieldData?.fields?.length}`}</p>
            </div>
            <CardDescription>
              Insira sua formação acadêmica e informações adicionais.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              {fieldData.fields.length >= 0 && (
                <div
                  className="w-full flex flex-col gap-2"
                  key={`fieldData-${firstStepIteration}`}
                >
                  <FormField
                    control={control}
                    name={`data.${firstStepIteration}.topic` as const}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Tópico</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            name={field.name}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder="Insira o tópico associado"
                                onChange={field.onChange}
                              />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {Topic?.map((topic) => (
                                  <SelectItem
                                    key={`${field.name}-${topic}`}
                                    value={String(topic)}
                                  >
                                    {topic}
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
                                  {AcademicEducationPatternMatching[
                                    watch("data")[firstStepIteration]
                                      ?.topic as ITopic
                                  ]?.map((category) => (
                                    <SelectItem
                                      key={`${field.name}-${category.label}`}
                                      value={String(category.value)}
                                    >
                                      {category.label}
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
                      name={
                        `data.${firstStepIteration}.certifications` as const
                      }
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
                                  {data?.certifications
                                    .filter((certification) => {
                                      return !watch("data")?.some(
                                        (dataItem, index) =>
                                          dataItem.certifications ===
                                            certification.url &&
                                          firstStepIteration !== index
                                      );
                                    })
                                    .map((certifications) => (
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
                              className="min-h-[227px]"
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
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
              <PDFView
                data={data?.certifications}
                formSelectedCertifications={watch("data")}
                firstStepIteration={firstStepIteration}
              />
            </div>
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
