import React from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import { PaperclipIcon } from "lucide-react";
import ModalCurriculumSent from "../../modal/curriculum-sent";

interface CardItemProps {
  data: Card;
}

export default function CardCurriculumSent(props: CardItemProps) {
  const { data } = props;

  return (
    <React.Fragment>
      <ModalCurriculumSent data={data}>
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

            {data?.certifications && data?.certifications?.length > 0 && (
              <div className="flex text-primary text-xs rounded-sm w-fit px-1">
                <PaperclipIcon className="w-4 h-4 text-muted-foreground" />
                {data?.certifications?.length}
              </div>
            )}
          </div>
        </div>
      </ModalCurriculumSent>
    </React.Fragment>
  );
}
