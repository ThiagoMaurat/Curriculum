import { Button } from "@/components/ui/button";
import React from "react";
import AcademicCard from "./academic-card";
import BibliographyCard from "./bibliography-card";
import { Card, CardContent } from "@/components/ui/card";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SecondStep(props: SecondStepProps) {
  const { setCurrentStep } = props;

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <AcademicCard />
        <BibliographyCard />
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => setCurrentStep(2)}
          >
            Próximo passo
          </Button>

          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="outline"
            onClick={() => setCurrentStep(0)}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
