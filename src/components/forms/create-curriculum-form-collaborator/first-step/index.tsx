import { Button } from "@/components/ui/button";
import React from "react";
import AcademicCard from "./academic-card";
import { Card, CardContent } from "@/components/ui/card";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CurriculumFormInput } from "../type";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  data: ListTodoCurriculumByCollaborator;
}

export default function FirstStep(props: SecondStepProps) {
  const { setCurrentStep, currentStep, data } = props;
  const { trigger, control, reset, watch, getValues } =
    useFormContext<CurriculumFormInput>();
  const fieldData = useFieldArray<CurriculumFormInput, "data">({
    control: control,
    name: "data",
  });

  const addFieldDataArray = async () => {
    const [validateForm] = await Promise.all([trigger("data")]);

    if (validateForm) {
      fieldData.insert(fieldData.fields.length - 1, {
        description: watch("data")[0].description,
        subcategory: "",
        finalYear: new Date().getFullYear(),
        initialYear: new Date().getFullYear(),
        certifications: "",
      });

      reset();
    }
  };

  const backFieldArray = () => {
    fieldData.remove(fieldData.fields.length - 1);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <AcademicCard
          data={data}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
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
    </React.Fragment>
  );
}
