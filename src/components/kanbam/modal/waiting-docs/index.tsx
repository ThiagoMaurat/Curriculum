import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import CommentsComponent from "../../comments";

interface ModalWaitingDocsProps {
  onOpenChange: () => void;
  open: boolean;
  data: Card;
}

export default function ModalWaitingDocs(props: ModalWaitingDocsProps) {
  const { onOpenChange, open, data } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        <CommentsComponent data={data} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
