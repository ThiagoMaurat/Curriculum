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
import FirstStep from "../forms/create-curriculum-form-collaborator/first-step/index";
import SecondStep from "../forms/create-curriculum-form-collaborator/second-step";
import { Certification, Curriculum } from "@/server/db/types-schema";
import { CurriculumStatus } from "@/server/db/schema";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/hooks/use-toast";
import { createCertificateByCollaborator } from "@/server/action/create-pdf-curriculum-by-collaborator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState(0);
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { startUpload } = useUploadThing("pdfUploadStudent");
  const [isSendingForm, setIsSendingForm] = React.useState(false);

  const curriculumSteps: Array<{ title: string }> = [
    {
      title: "Preencher dados",
    },
    {
      title: "Preview",
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

  const saveAndGenerateCurriculum = async (blob: Blob) => {
    setIsSendingForm(true);
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
    const file = new File([blobFinalDoc], "curriculum.pdf", {
      type: "application/pdf",
    });

    let uploadDedImages: { url: string; key: string; fileName: string }[] = [];

    try {
      const uploadImages = await startUpload([file]);

      if (!uploadImages) {
        return;
      }

      uploadDedImages = uploadImages?.map((item) => {
        return {
          url: item.url,
          key: item.key,
          fileName: item.name,
        };
      });
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao enviar certificado.",
        duration: 3000,
      });
    } finally {
      setIsSendingForm(false);
    }

    const { data: serverData, serverError } =
      await createCertificateByCollaborator({
        curriculumId: data.id,
        generatedPDFKey: uploadDedImages[0].key,
        generatedPDFUrl: uploadDedImages[0].url,
        generatedPDPFileName: uploadDedImages[0].fileName,
        roleName: session?.user?.roleName as any,
        pdfFormGenerated: methods.getValues("data"),
      });

    if (serverError) {
      toast({
        title: "Erro",
        description: serverError || "Erro ao salvar certificado.",
        duration: 3000,
      });
      setIsSendingForm(false);
      return;
    }

    if (serverData) {
      toast({
        title: "Sucesso",
        description: serverData.message,
        duration: 3000,
      });
    }

    setIsSendingForm(false);
    router.push("/");
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
            <FirstStep
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              data={data}
            />
          )}

          {currentStep === 1 && (
            <SecondStep>
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
                {({ blob, loading, error }) => {
                  if (blob) {
                    return (
                      <div className="w-full flex flex-col">
                        <Button
                          className="mb-2"
                          onClick={async () => await downloadBlob(blob)}
                        >
                          {loading
                            ? "Loading..."
                            : "Download com os Currículos"}
                        </Button>
                      </div>
                    );
                  }

                  if (error) {
                    return <div>{error.message}</div>;
                  }
                }}
              </BlobProvider>

              <BlobProvider
                document={
                  <PdfCurriculumTemplate
                    formsFilledByStudent={data}
                    data={methods.watch() as CurriculumFormInput}
                  />
                }
              >
                {({ blob, loading, error }) => {
                  if (blob) {
                    return (
                      <div className="w-full flex flex-col">
                        <Button
                          className="mb-2"
                          isLoading={isSendingForm}
                          disabled={isSendingForm}
                          onClick={async () =>
                            await saveAndGenerateCurriculum(blob)
                          }
                        >
                          {loading ? "Loading..." : "Enviar e gerar currículo"}
                        </Button>
                      </div>
                    );
                  }

                  if (error) {
                    return <div>{error.message}</div>;
                  }
                }}
              </BlobProvider>

              <PDFViewer className="w-full h-full min-h-96">
                <PdfCurriculumTemplate
                  formsFilledByStudent={data}
                  data={methods.watch() as CurriculumFormInput}
                />
              </PDFViewer>
            </SecondStep>
          )}
        </form>
      </Form>
    </div>
  );
}
