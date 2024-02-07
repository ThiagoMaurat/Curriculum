import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import { PaperclipIcon } from "lucide-react";
import ModalSelection from "../../modal/selection";

interface CardItemProps {
  data: Card;
}

export default function CardSelection(props: CardItemProps) {
  const { data } = props;
  const [waitingDocsOpen, setWaitingDocsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <ModalSelection
        onOpenChange={() => setWaitingDocsOpen((state) => !state)}
        open={waitingDocsOpen}
        data={data}
      />

      <div
        role="button"
        className="flex gap-1  flex-col truncate border-2 border-transparent hover:border-black py-2 px-3 text-xs bg-primary-foreground rounded-md shadow-sm"
        onClick={() => {
          setWaitingDocsOpen(true);
        }}
      >
        {data?.name}

        <div className="flex gap-1 justify-between">
          <div className="bg-green-600 text-white text-xs rounded-sm w-fit px-1">
            {data?.createdAt && format(data?.createdAt, "dd/MM/yyyy HH:mm")}
          </div>

          <div className="flex text-primary text-xs rounded-sm w-fit px-1">
            <PaperclipIcon className="w-4 h-4 text-muted-foreground" />
            {data?.certifications?.length}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
