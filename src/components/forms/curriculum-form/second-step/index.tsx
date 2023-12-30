import { Button } from "@/components/ui/button";
import React from "react";
import AcademicCard from "./academic-card";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SecondStep(props: SecondStepProps) {
  const { setCurrentStep } = props;

  return (
    <React.Fragment>
      <AcademicCard />
      <Button
        type="button"
        className="self-center align-middle w-full max-w-2xl"
        variant="default"
      >
        Próximo passo
      </Button>
    </React.Fragment>
  );
}
