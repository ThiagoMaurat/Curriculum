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
        {data.curriculums ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-2 h-8" variant="destructive">
                Visualizar
                <span className="sr-only">Upload Images</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px] max-h-[600px] overflow-auto">
              {/* TODO: show and edit the curriculum by admin */}
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
    </section>
  );
}
