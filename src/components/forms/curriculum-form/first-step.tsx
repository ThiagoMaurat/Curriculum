import React from "react";

interface FirstStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FirstStep(props: FirstStepProps) {
  return <div>FirstStep</div>;
}
