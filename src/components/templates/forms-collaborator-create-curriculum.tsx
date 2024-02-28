"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step } from "@/components/steper/step";
import { Form } from "@/components/ui/form";
import { schema } from "@/components/forms/create-curriculum-form-collaborator/schema";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { DEFAULT_FORM } from "@/components/forms/create-curriculum-form-collaborator/data";
import { PdfCurriculumTemplate } from "./pdf-curriculum-template-admin";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PDFMerger from "pdf-merger-js";
import FirstStep from "../forms/create-curriculum-form-collaborator/first-step";
import SecondStep from "../forms/create-curriculum-form-collaborator/second-step";
import ThirdStep from "../forms/create-curriculum-form-collaborator/third-step";
import FourthStep from "../forms/create-curriculum-form-collaborator/fourth-step";
import { Certification, Curriculum } from "@/server/db/types-schema";
import { CurriculumStatus } from "@/server/db/schema";

export type ListTodoCurriculumByCollaborator = {
  statusCurriculum: CurriculumStatus;
  certifications: Array<Certification>;
  collaborators: {
    id: string;
    name: string | null;
    email: string;
  } | null;
} & Curriculum;

interface FormsCollaboratorCreateCurriculumProps {
  data: ListTodoCurriculumByCollaborator;
}

export function FormsCollaboratorCreateCurriculum(
  props: FormsCollaboratorCreateCurriculumProps
) {
  const { data } = props;
  const [currentStep, setCurrentStep] = React.useState(0);

  const curriculumSteps: Array<{ title: string }> = [
    {
      title: "Formação e Bibliografia",
    },
    {
      title: "Congressos e Eventos",
    },
    {
      title: "Atividades Extracurriculares e Profissionais",
    },
    {
      title: "Certificados",
    },
  ];

  const methods = useForm<CurriculumFormInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM,
  });

  const submitHandler = async (data: CurriculumFormInput) => {
    console.log(data);
  };

  const downloadBlob = async (blob: Blob) => {
    const merger = new PDFMerger();

    const blobBuffer = await blob.arrayBuffer();

    await merger.add(blobBuffer);

    for (const [_, value] of Object.entries(methods.getValues())) {
      for (const [_, value2] of Object.entries(value)) {
        if (value2.certifications) {
          const response = await fetch(value2.certifications);
          const dataBlob = await response.blob();
          const blobBuffer = await dataBlob.arrayBuffer();
          await merger.add(blobBuffer);
        }
      }
    }

    const finalDoc = await merger.saveAsBuffer();
    const blobFinalDoc = new Blob([finalDoc], { type: "application/pdf" });
    const url = URL.createObjectURL(blobFinalDoc);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "curriculum.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="w-full h-full pb-4 flex flex-col gap-12">
      <div className="flex max-w-6xl mx-auto ring-1 ring-main-primary rounded-2xl py-5 px-4">
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
          {currentStep === 0 && (
            <FirstStep setCurrentStep={setCurrentStep} data={data} />
          )}
          {currentStep === 1 && (
            <SecondStep setCurrentStep={setCurrentStep} data={data} />
          )}
          {currentStep === 2 && (
            <ThirdStep setCurrentStep={setCurrentStep} data={data} />
          )}
          {currentStep === 3 && (
            <FourthStep>
              <Button className="mb-2" onClick={() => setCurrentStep(0)}>
                Voltar
              </Button>
              <BlobProvider
                document={
                  <PdfCurriculumTemplate
                    formsFilledByStudent={data}
                    data={methods.watch() as CurriculumFormInput}
                  />
                }
              >
                {({ blob, loading }) => {
                  if (blob) {
                    return (
                      <Button
                        className="mb-2"
                        onClick={() => downloadBlob(blob)}
                      >
                        {loading ? "Loading..." : "Download com os Currículos"}
                      </Button>
                    );
                  }
                }}
              </BlobProvider>

              <PDFViewer className="w-full h-full min-h-96">
                <PdfCurriculumTemplate
                  formsFilledByStudent={data}
                  data={methods.watch() as CurriculumFormInput}
                />
              </PDFViewer>
            </FourthStep>
          )}
        </form>
      </Form>
    </div>
  );
}
