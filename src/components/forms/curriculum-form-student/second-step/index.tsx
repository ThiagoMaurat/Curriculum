import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileDialog, FileWithPreview } from "@/components/ui/file-upload";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FormStudent } from "../type";

export default function SecondStepStudent() {
  const form = useFormContext<FormStudent>();

  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const { isUploading, startUpload } = useUploadThing("pdfUploadStudent");

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Upload de certificados</CardTitle>
        <CardDescription>
          Insira os certificados dos cursos que você já concluiu e gostaria que
          fossem inclusos no pdf.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="certificate"
              maxFiles={12}
              maxSize={1024 * 1024 * 4 /* 4mb */}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isUploading}
              accept={{ "pdf/*": [".pdf"] }}
            />
          </FormControl>

          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.certificate?.message}
          </p>
        </FormItem>

        <Button type="submit">Enviar</Button>
      </CardContent>
    </Card>
  );
}
