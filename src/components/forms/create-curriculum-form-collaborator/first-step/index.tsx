import { Button } from "@/components/ui/button";
import React from "react";
import AcademicCard from "./academic-card";
import BibliographyCard from "./bibliography-card";
import { Card, CardContent } from "@/components/ui/card";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { useFormContext } from "react-hook-form";
import { CurriculumFormInput } from "../type";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  data: ListTodoCurriculumByCollaborator;
}

export default function FirstStep(props: SecondStepProps) {
  const { setCurrentStep, data } = props;
  const { trigger } = useFormContext<CurriculumFormInput>();

  const validateFirstStepStudent = async () => {
    const [academicEducation, bibliography] = await Promise.all([
      trigger("academicEducation"),
      trigger("bibliography"),
    ]);

    if (academicEducation && bibliography) {
      setCurrentStep(1);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <AcademicCard data={data} />
        <BibliographyCard data={data} />
      </div>

      <Card className="mt-4 max-w-xl w-full mx-auto">
        <CardContent className="mt-4 space-y-2">
          <Button
            type="submit"
            className="self-center align-middle w-full"
            variant="default"
            onClick={() => validateFirstStepStudent()}
          >
            Próximo passo
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
