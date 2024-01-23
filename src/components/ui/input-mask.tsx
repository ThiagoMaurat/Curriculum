import * as React from "react";

import { cn } from "@/lib/utils";
import InputMask, { ReactInputMask } from "react-input-mask";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  mask: string | (string | RegExp)[];
};

const InputFieldMask = React.forwardRef<ReactInputMask, InputProps>(
  ({ className, mask, type, ...props }, ref) => {
    return (
      <InputMask
        mask={mask}
        type={type}
        className={cn(
          "bg-background border placeholder:text-muted-foreground ring-offset-background px-3 rounded-lg h-10 w-full",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
InputFieldMask.displayName = "InputFieldMask";

export { InputFieldMask };
