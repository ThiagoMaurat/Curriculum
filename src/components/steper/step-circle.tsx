import { Check } from "lucide-react";
import React from "react";

interface RadioCircleProps {
  isCompleted: boolean;
  isActive: boolean;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted, isActive } = props;

  return (
    <div
      className="data-[is-active=true]:bg-main-primary data-[is-active=false]:bg-inherit h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full"
      data-is-active={isActive}
      /* borderWidth={
        isMobile
          ? "1.94px"
          : !isActive && !isCompleted
          ? "5px"
          : isCompleted
          ? "0px"
          : "4px"
      } */
      /* borderColor={isActive ? "brand.500" : "#6B6B6B"} */
      {...props}
    >
      {isCompleted ? (
        <Check className="text-[#202023] text-xl" />
      ) : (
        <div
          data-is-active={isActive}
          className="h-10 w-10 rounded-full data-[is-active=true]:bg-main-primary data-[is-active=false]:bg-[#6B6B6B]"
        />
      )}
    </div>
  );
};
