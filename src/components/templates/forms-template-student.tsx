"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormStudent } from "../forms/curriculum-form-student/type";
import { DEFAULT_FORM } from "../forms/curriculum-form-student/data";
import { Step } from "../steper/step";
import { Form } from "../ui/form";
import FirstStep from "../forms/curriculum-form-student/first-step";

export default function FormsTemplateStudent() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const curriculumSteps: Array<{ title: string }> = [
    {
      title: "Dados pessoais",
    },
    {
      title: "Certificados",
    },
  ];

  const methods = useForm<FormStudent>({
    /* resolver: zodResolver(schema), */
    mode: "onChange",
    defaultValues: DEFAULT_FORM,
  });

  const submitHandler = async (data: FormStudent) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full pb-4 flex flex-col gap-12">
      <div className="flex max-w-md w-full mx-auto ring-1 ring-main-primary rounded-2xl py-5 px-4">
        {curriculumSteps.map((step, index) => {
          return (
            <Step
              key={`step-${index}`}
              index={index + 1}
              title={step.title}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              isFirstStep={index === 0}
              isLastStep={curriculumSteps.length === index + 1}
            />
          );
        })}
      </div>

      <Form {...methods}>
        <form
          onSubmit={(...args) =>
            void methods.handleSubmit(submitHandler)(...args)
          }
        >
          {currentStep === 0 && <FirstStep setCurrentStep={setCurrentStep} />}
        </form>
      </Form>
    </div>
  );
}
