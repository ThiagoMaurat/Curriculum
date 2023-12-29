import React from "react";

interface SecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SecondStep(props: SecondStepProps) {
  return <div>SecondStep</div>;
}
