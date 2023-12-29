"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";

import { DayPicker } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type DatePickerProps = CalendarProps & {
  label: any;
};

export function DatePicker(props: DatePickerProps) {
  const { label, ...rest } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !label && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label ? (
            format(label, `d 'de' MMMM 'de' yyyy`, { locale: rest.locale })
          ) : (
            <span>Escolha a data</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar {...rest} />
      </PopoverContent>
    </Popover>
  );
}
