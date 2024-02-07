import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";

interface ModalSelectionProps {
  onOpenChange: () => void;
  open: boolean;
  data: Card;
}

export default function ModalSelection(props: ModalSelectionProps) {
  const { onOpenChange, open, data } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[600px] overflow-auto">
        <p className="text-muted-foreground text-lg font-bold">
          Nome: <span className="text-primary text-base">{data?.name}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Conta criada em:{" "}
          <span className="text-primary text-base">
            {data?.createdAt && format(data?.createdAt, "dd/MM/yyyy HH:mm")}
          </span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Email: <span className="text-primary text-base">{data?.email}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Produto:{" "}
          <span className="text-primary text-base">{data?.product}</span>
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
      </DialogContent>
    </Dialog>
  );
}
