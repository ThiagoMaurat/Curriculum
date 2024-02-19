import React from "react";
import ExtracurricularActivities from "./extracurricular-activities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfessionalExperience from "./professional-experience";

interface FourthStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function ThirdStep(props: FourthStepProps) {
  const { setCurrentStep } = props;

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <ExtracurricularActivities />
        <ProfessionalExperience />
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => setCurrentStep(3)}
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
