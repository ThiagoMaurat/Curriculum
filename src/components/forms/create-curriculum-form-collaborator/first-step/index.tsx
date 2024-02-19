import { Button } from "@/components/ui/button";
import React from "react";
import AcademicCard from "./academic-card";
import BibliographyCard from "./bibliography-card";
import { Card, CardContent } from "@/components/ui/card";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  data: ListTodoCurriculumByCollaborator;
}

export default function FirstStep(props: SecondStepProps) {
  const { setCurrentStep, data } = props;

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <AcademicCard data={data} />
        <BibliographyCard data={data} />
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            type="button"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => setCurrentStep(1)}
          >
            Próximo passo
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
