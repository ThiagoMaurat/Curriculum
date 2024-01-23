"use client";
import { FileDialog, FileWithPreview } from "@/components/ui/file-upload";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Certification } from "@/db/types-schema";
import { GetFormAlreadySenteUserCaseOutput } from "@/server/use-cases/get-form-already-sent";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EditFormStudent } from "../schema";

interface SecondStepProps {
  data: GetFormAlreadySenteUserCaseOutput;
}

export default function SecondStepEditForm(props: SecondStepProps) {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<EditFormStudent>();

  const { data } = props;

  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

  const convertCertificateLinToFileWithPreview = async (
    fileCertification: Certification[]
  ): Promise<FileWithPreview[]> => {
    const data = await Promise.all(
      fileCertification.map(async (item, index) => {
        const response = await fetch(item.url, {
          cache: "no-cache",
        });

        const blob = await response.blob();

        const file = new File([blob], item.fileName, {
          type: "application/pdf",
        });

        const fileWithPreview: FileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(blob),
        });

        return fileWithPreview;
      })
    );

    return data;
  };

  useEffect(() => {
    if (data.certifications) {
      convertCertificateLinToFileWithPreview(data.certifications).then(
        (data) => {
          setFiles(data);
          setValue("certificate", data);
        }
      );
    }
  }, [data.certifications, setValue]);

  return (
    <FormItem className="flex w-full flex-col gap-1.5">
      <FormLabel>Images</FormLabel>
      <FormControl>
        <FileDialog
          setValue={setValue}
          name="certificate"
          maxFiles={12}
          maxSize={1024 * 1024 * 4 /* 4mb */}
          files={files}
          setFiles={setFiles}
          /* isUploading={isUploading}
              disabled={isUploading} */
          accept={{ pdf: [".pdf"] }}
        />
      </FormControl>

      <p className="text-sm font-medium text-destructive">
        {errors.certificate?.message}
      </p>
    </FormItem>
  );
}
