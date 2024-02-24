import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfessionalExperience from "./professional-experience";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { useFormContext } from "react-hook-form";
import { CurriculumFormInput } from "../type";

interface FourthStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  data: ListTodoCurriculumByCollaborator;
}

export default function ThirdStep(props: FourthStepProps) {
  const { data, setCurrentStep } = props;
  const { trigger } = useFormContext<CurriculumFormInput>();

  const validateSecondStepStudent = async () => {
    const professionalExperience = await trigger("professionalExperience");

    if (professionalExperience) {
      setCurrentStep(3);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <ProfessionalExperience data={data} />
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => validateSecondStepStudent()}
          >
            Próximo passo
          </Button>

          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="outline"
            onClick={() => setCurrentStep(1)}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
