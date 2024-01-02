"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FirstStep from "@/components/forms/curriculum-form/first-step";
import SecondStep from "@/components/forms/curriculum-form/second-step";
import ThirdStep from "@/components/forms/curriculum-form/third-step";
import FourthStep from "@/components/forms/curriculum-form/fourth-step";
import FifthStep from "@/components/forms/curriculum-form/fifth-step";
import { Step } from "@/components/steper/step";
import { Form } from "@/components/ui/form";
import { schema } from "@/components/forms/curriculum-form/schema";
import { CurriculumFormInput } from "@/components/forms/curriculum-form/type";
import { DEFAULT_FORM } from "@/components/forms/curriculum-form/data";
import { PdfCurriculumTemplate } from "./pdf-curriculum-template";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PDFMerger from "pdf-merger-js";

export default function FormsTemplate() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const curriculumSteps: Array<{ title: string }> = [
    {
      title: "Dados pessoais",
    },
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
    /* resolver: zodResolver(schema), */
    mode: "onChange",
    defaultValues: DEFAULT_FORM,
  });

  const submitHandler = async (data: CurriculumFormInput) => {
    console.log(data);
  };

  const downloadBlob = async (blob: Blob) => {
    const merger = new PDFMerger();

    const blobBuffer = await blob.arrayBuffer();

    await merger.add(blobBuffer); //merge all pages. parameter is the path to file and filename.

    const pdf = await fetch(
      "https://utfs.io/f/d3f5f289-1aa8-4064-9a86-b2234e915434-f1lhsm.pdf"
    );

    const pdfBuffer = await pdf.arrayBuffer();

    await merger.add(pdfBuffer); //merge all pages. parameter is the path to file and filename.

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
      <div className="flex ring-1 ring-main-primary rounded-2xl py-5 px-4">
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
          {currentStep === 1 && <SecondStep setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <ThirdStep setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <FourthStep setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && (
            <FifthStep>
              <BlobProvider
                document={<PdfCurriculumTemplate data={methods.watch()} />}
              >
                {({ blob, url, loading, error }) => {
                  if (blob) {
                    return (
                      <Button onClick={() => downloadBlob(blob)}>
                        {loading ? "Loading..." : "Download"}
                      </Button>
                    );
                  }
                }}
              </BlobProvider>

              <PDFViewer className="w-full h-full min-h-96">
                <PdfCurriculumTemplate data={methods.watch()} />
              </PDFViewer>
            </FifthStep>
          )}
        </form>
      </Form>
    </div>
  );
}
