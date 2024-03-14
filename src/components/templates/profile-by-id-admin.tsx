import { format } from "date-fns";
import React from "react";
import { env } from "../../../env.mjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Curriculum, Certification } from "@/server/db/types-schema";

type CurriculumWithCollaborators = Curriculum & {
  collaborators: {
    name: string | null;
    email: string | null;
  } | null;
};

interface ProfileByIdAdminProps {
  data: {
    id: string;
    name: string | null;
    email: string;
    product: string | null;
    createdAt: Date;
    createPasswordToken: string | null;
    amount: string;
    curriculums: CurriculumWithCollaborators;
    certifications: Certification[] | null;
    roles: Array<{ name: string }>;
  };
}

export default function ProfileByIdAdmin({ data }: ProfileByIdAdminProps) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-lg font-bold">
        Nome: <span className="text-primary text-base">{data?.name}</span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Conta criada em:{" "}
        <span className="text-primary text-base">
          {format(data?.createdAt, "dd/MM/yyyy HH:mm")}
        </span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Email: <span className="text-primary text-base">{data?.email}</span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Produto: <span className="text-primary text-base">{data?.product}</span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Permissão:{" "}
        <span className="text-primary text-base">{data?.roles[0].name}</span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Link senha:{" "}
        {data.createPasswordToken ? (
          <a
            href={`${env.NEXT_PUBLIC_APP_URL}/create-password?token=${data.createPasswordToken}&email=${data.email}`}
            className="text-primary text-base underline"
          >{`${env.NEXT_PUBLIC_APP_URL}/create-password?token=${data.createPasswordToken}&email=${data.email}`}</a>
        ) : (
          <span className="text-primary text-base">Já criada</span>
        )}
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Produto:{" "}
        <span className="text-primary text-base ">
          {data.product ? data.product : "-"}
        </span>
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
                  {index !== data!.certifications!.length - 1 ? ", " : ""}
                </React.Fragment>
              ))
            : "-"}
        </span>
      </p>

      <p className="text-muted-foreground text-lg font-bold">
        Currículo:{"  "}
        {data?.curriculums?.email ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-2 h-8" variant="destructive">
                Visualizar
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px] max-h-[600px] overflow-auto">
              <p className="text-muted-foreground text-lg font-bold">
                Nome Completo:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.fullName
                    ? data?.curriculums?.fullName
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Nome do pai:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.fathersName
                    ? data?.curriculums?.fathersName
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Nome da mãe:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.mothersName
                    ? data?.curriculums?.mothersName
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Data de Nascimento:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.birthday
                    ? format(data?.curriculums?.birthday, "dd/MM/yyyy")
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Data de Início do curso:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.initialCourseDate
                    ? format(data?.curriculums?.initialCourseDate, "dd/MM/yyyy")
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Data final do curso:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.finalCourseDate
                    ? format(data?.curriculums?.finalCourseDate, "dd/MM/yyyy")
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Documento de Identidade:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.identityDocument
                    ? data?.curriculums?.identityDocument
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                CRM:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.CRM ? data?.curriculums?.CRM : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                CPF:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.CPF ? data?.curriculums?.CPF : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Telefone:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.phone ? data?.curriculums?.phone : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Endereço:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.address
                    ? data?.curriculums?.address
                    : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Email:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.email ? data?.curriculums?.email : "-"}
                </span>
              </p>

              <p className="text-muted-foreground text-lg font-bold">
                Currículo Lattes:{" "}
                <span className="text-primary text-base ">
                  {data?.curriculums?.lattes ? data?.curriculums?.lattes : "-"}
                </span>
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
                          {index !== data!.certifications!.length - 1
                            ? ", "
                            : ""}
                        </React.Fragment>
                      ))
                    : "-"}
                </span>
              </p>
            </DialogContent>
          </Dialog>
        ) : (
          <span className="text-primary text-base">-</span>
        )}
      </p>

      {data && data?.roles?.[0].name === "user" && (
        <p className="text-muted-foreground text-lg font-bold">
          Valor:{" "}
          <span className="text-primary text-base ">
            {data.amount
              ? Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(data.amount))
              : "-"}
          </span>
        </p>
      )}

      {data && data?.curriculums?.collaborators && (
        <p className="text-muted-foreground text-lg font-bold">
          Colaborador associado:{" "}
          <span className="text-primary text-base ">
            {data?.curriculums?.collaborators?.name
              ? data?.curriculums?.collaborators?.name
              : "-"}
          </span>
        </p>
      )}

{data?.curriculums?.generatedPDFUrl && (
          <p className="text-muted-foreground text-lg font-bold">
            Link do PDF final:{" "}
            <a
              href={data?.curriculums?.generatedPDFUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary text-base">
                {data?.curriculums?.generatedPDFUrl}
              </span>
            </a>
          </p>
        )}

        {data?.curriculums?.generatedPDFUploadedAt && (
          <p className="text-muted-foreground text-lg font-bold">
            PDF final gerado em:{" "}
            <span className="text-primary text-base">
              {data?.curriculums?.generatedPDFUploadedAt &&
                format(data?.curriculums?.generatedPDFUploadedAt, "dd/MM/yyyy HH:mm")}
            </span>
          </p>
        )}
    </section>
  );
}
