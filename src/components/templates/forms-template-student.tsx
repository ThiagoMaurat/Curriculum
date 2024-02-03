"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_FORM } from "../forms/curriculum-form-student/data";
import { Step } from "../steper/step";
import { Form } from "../ui/form";
import FirstStepStudent from "../forms/curriculum-form-student/first-step";
import SecondStepStudent from "../forms/curriculum-form-student/second-step";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { updateUserAndCreateCertificateAction } from "@/server/action/update-user-create-certificate";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  FormStudent,
  sendUserCurriculumForm,
} from "../forms/curriculum-form-student/schema";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const { data: session, update } = useSession();

  const { push, prefetch } = useRouter();

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const { startUpload } = useUploadThing("pdfUploadStudent");

  const methods = useForm<FormStudent>({
    resolver: zodResolver(sendUserCurriculumForm),
    mode: "onBlur",
    defaultValues: DEFAULT_FORM,
  });

  const submitHandler = async (data: FormStudent) => {
    if (!session?.user.id) {
      return;
    }

    let uploadDedImages: { url: string; key: string; fileName: string }[] = [];

    if (data.certificate && data.certificate.length > 0) {
      try {
        const uploadImages = await startUpload(data.certificate as File[]);

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

        return;
      }
    }

    const { serverError } = await updateUserAndCreateCertificateAction({
      fullName: data.fullName,
      fathersName: data.fathersName,
      mothersName: data.mothersName,
      birthday: data.birthday,
      identityDocument: data.identityDocument,
      CRM: data.CRM,
      CPF: data.CPF,
      phone: data.phone,
      address: data.address,
      email: data.email,
      selfDescription: data.selfDescription,
      lattes: data.lattes,
      userId: session?.user.id,
      certification: uploadDedImages,
      finalCourseDate: data.finalCourseDate,
      initialCourseDate: data.initialCourseDate,
    });

    if (serverError) {
      toast({
        title: "Erro",
        description: serverError || "Erro ao enviar formulário.",
        duration: 4000,
      });

      return;
    }

    toast({
      title: "Sucesso.",
      description:
        "Muito obrigado, já temos todas as informações necessárias para a confecção do seu currículo, caso haja alguma pendência te informaremos pelo WhatsApp. Caso precise enviar novos certificados clique em atualizar currículo.",
      duration: 4000,
    });

    await update({
      hasSendCertification: true,
    });

    prefetch("/");
    push("/");
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
          {currentStep === 0 && (
            <FirstStepStudent setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 1 && <SecondStepStudent />}
        </form>
      </Form>
    </div>
  );
}
