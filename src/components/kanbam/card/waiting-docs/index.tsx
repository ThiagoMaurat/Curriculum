import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import ModalWaitingDocs from "../../modal/waiting-docs";

interface CardItemProps {
  data: Card;
}

export default function CardWaitingDocs(props: CardItemProps) {
  const { data } = props;

  return (
    <div>
      <ModalWaitingDocs data={data!}>
        <div
          role="button"
          className="flex gap-1  flex-col truncate border-2 border-transparent hover:border-black py-2 px-3 text-xs bg-primary-foreground rounded-md shadow-sm"
        >
          {data?.user?.name}

          <div className="flex gap-1 justify-between">
            <div className="bg-green-600 text-white text-xs rounded-sm w-fit px-1">
              {data?.user?.createdAt &&
                format(data?.user?.createdAt, "dd/MM/yyyy HH:mm")}
            </div>
          </div>
        </div>
      </ModalWaitingDocs>
    </div>
  );
}
