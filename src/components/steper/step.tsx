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
  index: number;
}

export const Step = (props: StepProps) => {
  const {
    isActive,
    isCompleted,
    index,
    isLastStep,
    isFirstStep,
    title,
    description,
  } = props;

  return (
    <div
      data-is-last-step={isLastStep}
      className="data-[is-last-step=true]:flex-none flex flex-1 flex-col w-auto items-center justify-start sm:flex-row"
    >
      <StepCircle index={index} isActive={isActive} isCompleted={isCompleted} />

      <div className="w-full flex ml-4 flex-col items-start gap-1">
        <p
          className={`${
            !isActive && !isCompleted ? "text-gray-400" : "text-foreground"
          } font-semibold text-sm sm:text-md leading-2`}
          data-is-completed={isCompleted}
          data-is-active={isActive}
        >
          {title}
        </p>

        <p className="text-foreground text-sm line-clamp-2">{description}</p>
      </div>

      <Separator
        className="flex-1 ml-4 sm:flex-initial data-[is-last-step=true]:hidden border-2 border-[#3A3E45] data-[is-completed]:border-main-primary  data-[is-active]:border-main-primary self-center"
        data-is-last-step={isLastStep}
        data-is-completed={isCompleted}
        data-is-active={isActive}
        orientation={"horizontal"}
      />
    </div>
  );
};
