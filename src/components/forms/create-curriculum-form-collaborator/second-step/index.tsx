import { Button } from "@/components/ui/button";
import React from "react";
import Congress from "./congress";
import { Card, CardContent } from "@/components/ui/card";
import Events from "./events";

interface ThirdStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SecondSep(props: ThirdStepProps) {
  const { setCurrentStep } = props;

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        <Congress />
        <Events />
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
