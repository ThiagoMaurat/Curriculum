"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FirstStep from "@/components/forms/curriculum-form/first-step";
import SecondStep from "@/components/forms/curriculum-form/second-step";
import ThirdStep from "@/components/forms/curriculum-form/third-step";
import FourthStep from "@/components/forms/curriculum-form/fourth-step";
import FifthStep from "@/components/forms/curriculum-form/fifth-step";
import { curriculumSteps } from "@/components/forms/curriculum-form/data";
import { Step } from "@/components/steper/step";

export default function FormsTemplate() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const methods = useForm({
    /* resolver: zodResolver(schema), */
    mode: "onChange",
    defaultValues: {
      intendedSpecialties: [],
      intendedInstitutions: [],
      prepSchool: null,
      trackId: null,
      trialYear: null,
    },
  });

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full pb-4">
      <div className="flex ring-1 ring-main-primary rounded-2xl py-5 px-4">
        {curriculumSteps.map((step, index) => {
          return (
            <Step
              key={`step-${index}`}
              index={index}
              title={step.title}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              isFirstStep={index === 0}
              description={step.description}
              isLastStep={curriculumSteps.length === index + 1}
            />
          );
        })}
      </div>

      <FormProvider {...methods}>
        <form className="w-full" onSubmit={methods.handleSubmit(submitHandler)}>
          {currentStep === 0 && <FirstStep setCurrentStep={setCurrentStep} />}
          {currentStep === 1 && <SecondStep setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <ThirdStep setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <FourthStep setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <FifthStep setCurrentStep={setCurrentStep} />}
        </form>
      </FormProvider>
    </div>
  );
}
