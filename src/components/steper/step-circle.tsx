import { Check } from "lucide-react";
import React from "react";

interface RadioCircleProps {
  isCompleted: boolean;
  isActive: boolean;
  index: number;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted, isActive, index } = props;

  return (
    <div
      className="border-2 data-[is-active=true]:border-main-primary data-[is-active=false]:border-foreground h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full"
      data-is-active={isActive}
      {...props}
    >
      {isCompleted ? (
        <Check className="h-10 w-10 rounded-full flex items-center justify-center text-[#202023] text-xl" />
      ) : (
        <div
          data-is-active={isActive}
          className="flex items-center justify-center data-[is-active=true]:border-main-primary data-[is-active=false]:bg-inherit h-10 w-10 rounded-full"
        >
          {index}
        </div>
      )}
    </div>
  );
};
