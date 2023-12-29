import * as React from "react";
import { StepCircle } from "./step-circle";
import { Separator } from "../ui/separator";

interface StepProps {
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export const Step = (props: StepProps) => {
  const { isActive, isCompleted, isLastStep, isFirstStep, title, description } =
    props;

  return (
    <div className="flex flex-1 flex-col w-auto gap-3 sm:flex-row">
      <StepCircle isActive={isActive} isCompleted={isCompleted} />

      <Separator
        className="w-auto flex-1 sm:flex-initial data-[is-last-step]:hidden border-2 border-[#3A3E45] data-[is-completed]:border-[#FF7715]  data-[is-active]:border-[#FF7715] self-center"
        data-is-last-step={isLastStep}
        data-is-completed={isCompleted}
        data-is-active={isActive}
        orientation={"horizontal"}
      />

      <div
        /* pb={isMobile && !isLastStep ? "8" : "0"} */
        className="flex flex-col items-start gap-1"
      >
        <p
          className="text-foreground font-semibold text-sm sm:text-2xl line-clamp-1 leading-4 sm:leading-8"
          /* color={
            !isActive && !isCompleted ? "rgba(255, 255, 255, 0.6)" : "#FFFFFF"
          } */
        >
          {title}
        </p>

        <p className="text-foreground text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
