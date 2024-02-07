"use client";

import { ListItem } from "./list-item";
import { ListWithCards } from "./types";

interface ListContainerProps {
  data: ListWithCards[];
}

export const ListContainer = ({ data }: ListContainerProps) => {
  return (
    <ol className="flex w-full gap-x-3 h-full overflow-auto">
      {data.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}

      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
