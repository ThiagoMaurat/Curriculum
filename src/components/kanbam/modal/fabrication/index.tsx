import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import CommentsComponent from "../../comments";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Forward } from "lucide-react";

interface ModalFabricationProps {
  data: Card;
  children: React.ReactNode;
}

export default function ModalFabrication(props: ModalFabricationProps) {
  const { data, children } = props;
  const { data: session } = useSession();

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

        {/* if fabrication step and is collaborator should see the todo curriculum page */}
        {session?.user?.roleName === "collaborator" && (
          <>
            <Link
              className="w-fit"
              prefetch={false}
              href={`/collaborator/todo-curriculum/${data?.id}`}
            >
              <Button>
                Fabricar Currículo
                <Forward className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}

        <CommentsComponent data={data} />
      </DialogContent>
    </Dialog>
  );
}
