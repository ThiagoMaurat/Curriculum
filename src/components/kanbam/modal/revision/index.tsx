import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import CommentsComponent from "../../comments";
import Link from "next/link";

interface ModalRevisionProps {
  data: Card;
  children: React.ReactNode;
}

export default function ModalRevision(props: ModalRevisionProps) {
  const { data, children } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[600px] overflow-auto space-y-2">
        <p className="text-muted-foreground text-lg font-bold">
          Nome:{" "}
          <span className="text-primary text-base">{data?.user?.name}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Conta criada em:{" "}
          <span className="text-primary text-base">
            {data?.user?.createdAt &&
              format(data?.user?.createdAt, "dd/MM/yyyy HH:mm")}
          </span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Email:{" "}
          <span className="text-primary text-base">{data?.user?.email}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Produto:{" "}
          <span className="text-primary text-base">{data?.user?.product}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Certificados:{" "}
          <span className="text-primary text-base ">
            {data?.certifications && data?.certifications?.length > 0
              ? data.certifications.map((certification, index) => (
                  <React.Fragment key={certification.fileName}>
                    <a
                      href={`${certification.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certification.fileName}
                    </a>
                    {data?.certifications?.length &&
                    index !== data?.certifications?.length - 1
                      ? ", "
                      : ""}
                  </React.Fragment>
                ))
              : "-"}
          </span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Colaborador associado:{" "}
          {data?.collaborators?.name ? (
            <span className="text-primary text-base ">
              {data?.collaborators?.name && (
                <span>{data?.collaborators?.name}</span>
              )}
            </span>
          ) : (
            <span>Não há colaborador associado</span>
          )}
        </p>

        {data?.generatedPDFUrl && (
          <p className="text-muted-foreground text-lg font-bold">
            Link do PDF:{" "}
            <Link
              href={data?.generatedPDFUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary text-base">
                {data?.generatedPDFUrl}
              </span>
            </Link>
          </p>
        )}

        {data?.generatedPDFUploadedAt && (
          <p className="text-muted-foreground text-lg font-bold">
            PDF final gerado em:{" "}
            <span className="text-primary text-base">
              {data?.generatedPDFUploadedAt &&
                format(data?.generatedPDFUploadedAt, "dd/MM/yyyy HH:mm")}
            </span>
          </p>
        )}

        {data?.certifications?.map((item) => {
          if (item.isInsertedAfterCurriculumDone) {
            return (
              <p
                key={item.fileName}
                className="text-muted-foreground text-lg font-bold"
              >
                Certificados inseridos após o currículo ser concluído:{" "}
                <a
                  href={`${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-primary text-base">
                    {item.fileName}
                  </span>
                </a>
              </p>
            );
          }
        })}

        <CommentsComponent data={data} />
      </DialogContent>
    </Dialog>
  );
}
