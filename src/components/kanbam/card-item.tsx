"use client";

/* import { Card } from "@prisma/client"; */
import { Card } from "./types";

/* import { useCardModal } from "@/hooks/use-card-modal"; */

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  /* const cardModal = useCardModal(); */

  return (
    <div
      role="button"
      /* onClick={() => cardModal.onOpen(data.id)} */
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-primary-foreground rounded-md shadow-sm"
    >
      {data.title}
    </div>
  );
};