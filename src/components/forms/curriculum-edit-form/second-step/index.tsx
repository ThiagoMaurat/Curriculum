"use client";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Certification, Curriculum } from "@/server/db/types-schema";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { SecondStepSchema, secondStepSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CardCertificate from "@/components/ui/card-certificate";
import { deleteCertificationByIdAction } from "@/server/action/delete-certification-by-id";
import { FileWithPath } from "react-dropzone";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { createCertificationAction } from "@/server/action/create-certification";
import { Button } from "@/components/ui/button";

export type FileWithPreviewAndId = FileWithPath & {
  preview: string;
  id?: number;
  key?: string;
};

interface SecondStepProps {
  data: {} & Curriculum & {
      certifications: Certification[];
    };
}

export default function SecondStepEditForm(props: SecondStepProps) {
  const { data } = props;
  const { toast } = useToast();
  const { data: session } = useSession();
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { startUpload } = useUploadThing("pdfUploadStudent");
  const methods = useForm<SecondStepSchema>({
    resolver: zodResolver(secondStepSchema),
  });
  const [files, setFiles] = React.useState<FileWithPreviewAndId[] | null>(null);

  const [uploadFiles, setUploadFiles] = React.useState<
    FileWithPreviewAndId[] | null
  >([]);
  const convertCertificateLinToFileWithPreview = async (
    fileCertification: Certification[]
  ): Promise<FileWithPreviewAndId[]> => {
    const data = await Promise.all(
      fileCertification.map(async (item, index) => {
        const response = await fetch(item.url, {
          cache: "no-cache",
        });

        const blob = await response.blob();

        const file = new File([blob], item.fileName, {
          type: "application/pdf",
        });

        const fileWithPreview: FileWithPreviewAndId = Object.assign(file, {
          preview: URL.createObjectURL(blob),
          id: item.id,
          key: item.key,
        });

        return fileWithPreview;
      })
    );

    return data;
  };

  const onSubmit = async (dataForm: SecondStepSchema) => {
    if (!session?.user.id || !dataForm.certificate) {
      return;
    }

    const formCertificate = dataForm.certificate as File[];

    let uploadDedImages: { url: string; key: string; fileName: string }[] = [];

    if (formCertificate && formCertificate.length > 0) {
      try {
        const uploadImages = await startUpload(formCertificate);

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
      } finally {
        setUploadFiles(null);
      }
    }

    const { serverError } = await createCertificationAction({
      curriculumId: data.id,
      userId: session?.user.id,
      certification: uploadDedImages,
    });

    if (serverError) {
      toast({
        title: "Erro",
        description: serverError || "Erro ao salvar certificado.",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Certificado salvo com sucesso.",
      duration: 3000,
    });
  };

  useEffect(() => {
    if (data) {
      convertCertificateLinToFileWithPreview(data.certifications).then(
        (data) => {
          setFiles(data);
        }
      );
    }
  }, [data, setFiles]);

  const calcMaxFiles = useMemo(() => {
    if (files && files.length > 0) {
      return 10 - files.length;
    }

    return 10;
  }, [files]);

  return (
    <Form {...methods}>
      <form
        onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
        className="flex w-full flex-col gap-1.5"
      >
        <FormLabel>Images</FormLabel>

        <div className="mt-4 space-y-2 max-h-80 overflow-auto">
          {files &&
            files.length > 0 &&
            files.map((item, index) => {
              return (
                <CardCertificate
                  key={`card-certificate-${index}`}
                  href={item.preview}
                  title={item.name}
                  onDelete={async () => {
                    if (!session?.user.id || !item.key) {
                      return;
                    }

                    const { serverError } = await deleteCertificationByIdAction(
                      {
                        key: item.key!,
                        userId: session?.user.id,
                      }
                    );

                    if (serverError) {
                      toast({
                        title: "Erro",
                        description:
                          serverError || "Erro ao deletar certificado.",
                        duration: 3000,
                      });
                      return;
                    }

                    toast({
                      title: "Sucesso",
                      description: "Certificação deleta com sucesso",
                      duration: 4000,
                    });
                  }}
                />
              );
            })}
        </div>

        <FormItem className="flex w-full flex-col justify-center items-center gap-1.5">
          <FormControl>
            <FileUpload
              setValue={methods.setValue}
              name="certificate"
              maxFiles={calcMaxFiles}
              maxSize={1024 * 1024 * 4 /* 4mb */}
              files={uploadFiles}
              setFiles={setUploadFiles}
              accept={{ pdf: [".pdf"] }}
            />
          </FormControl>

          {methods.formState.errors.certificate?.message && (
            <p className="text-sm font-medium text-destructive">
              {methods.formState.errors.certificate?.message}
            </p>
          )}
        </FormItem>

        <Button
          className="mt-4"
          isLoading={methods.formState.isSubmitting}
          disabled={methods.formState.isSubmitting}
          type="submit"
        >
          Cadastrar certificado
        </Button>
      </form>
    </Form>
  );
}
