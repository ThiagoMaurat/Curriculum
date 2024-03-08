import * as React from "react";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowUpRight, Trash, Upload, X } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import Link from "next/link";
import { FileWithPreviewAndId } from "../forms/curriculum-edit-form/second-step";

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setValue: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreviewAndId[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreviewAndId[] | null>>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function FileUpload<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: FileDialogProps<TFieldValues>) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
          key: undefined,
        });

        if (files?.length === maxFiles) return;
        setFiles((prev) => [...(prev ?? []), fileWithPreview]);
      });

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast({
              title: "Erro.",
              description: `File is too large. Max size is ${formatBytes(
                maxSize
              )}`,
              duration: 2000,
            });
            return;
          }

          errors[0]?.message &&
            toast({
              title: "Erro.",
              description: errors[0].message,
              duration: 2000,
            });
        });
      }
    },

    [files?.length, maxFiles, maxSize, setFiles]
  );

  React.useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sm:max-w-[480px]">
      <div
        {...getRootProps()}
        className={cn(
          "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-muted-foreground/50",
          disabled && "pointer-events-none opacity-60",
          className
        )}
        {...props}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="group grid w-full place-items-center gap-1 sm:px-10">
            <Upload
              className="h-9 w-9 animate-pulse text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        ) : isDragActive ? (
          <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
            <Upload
              className={cn("h-8 w-8", isDragActive && "animate-bounce")}
              aria-hidden="true"
            />
            <p className="text-base font-medium">Drop the file here</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-1 sm:px-5">
            <Upload
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Arraste o arquivo aqui ou clique para selecioná-lo!
            </p>
            <p className="text-sm text-slate-500">
              Por favor, suba um arquivo inferior a {formatBytes(maxSize)}
            </p>
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
        Você pode subir até {maxFiles} {maxFiles === 1 ? "arquivo" : "arquivos"}
      </p>

      {files?.length ? (
        <div className="grid gap-5 max-h-52 overflow-y-auto">
          {files?.map((file, i) => (
            <FileCard
              key={i}
              i={i}
              files={files}
              setFiles={setFiles}
              file={file}
            />
          ))}
        </div>
      ) : null}

      {files?.length ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2.5 w-full"
          onClick={() => setFiles(null)}
        >
          <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
          Remove All
          <span className="sr-only">Remove all</span>
        </Button>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  i: number;
  file: FileWithPreviewAndId;
  files: FileWithPreviewAndId[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreviewAndId[] | null>>;
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-3">
        {/* <Link
          href={file.preview}
          target="_blank"
          rel="noreferrer"
          className=" shrink-0 rounded-md"
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link> */}

        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>

          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            if (!files) return;
            setFiles(files.filter((_, j) => j !== i));
          }}
        >
          <X className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
