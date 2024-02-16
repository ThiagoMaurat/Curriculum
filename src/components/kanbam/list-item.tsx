"use client";

import { cn } from "@/lib/utils";
import { ListHeader } from "./list-header";
import { ListWithCards } from "./types";
import React from "react";
import CardWaitingDocs from "./card/waiting-docs";
import { notFound } from "next/navigation";
import CardSelection from "./card/selection";
import CardFabrication from "./card/fabrication";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data }: ListItemProps) => {
  if (!data) {
    return notFound();
  }

  return (
    <li className="shrink-1 h-full w-full min-w-[225px] max-w-[257px] select-none">
      <div className="w-full rounded-md bg-primary-foreground shadow-md">
        <ListHeader data={data} />

        <ol
          className={cn(
            "px-1 rounded-b-lg py-0.5 flex flex-col gap-y-2 bg-secondary",
            data?.cards && data?.cards?.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {[data].map((list) => {
            if (list.title === "Aguardando documentação") {
              return list?.cards?.map((card, cardIndex) => (
                <CardWaitingDocs key={cardIndex} data={card} />
              ));
            }

            if (list.title === "Seleção") {
              return list?.cards?.map((card, cardIndex) => (
                <CardSelection key={cardIndex} data={card} />
              ));
            }

            if (list.title === "Fabricação") {
              return list?.cards?.map((card, cardIndex) => (
                <CardFabrication key={cardIndex} data={card} />
              ));
            }

            return null;
          })}
        </ol>
      </div>
    </li>
  );
};
