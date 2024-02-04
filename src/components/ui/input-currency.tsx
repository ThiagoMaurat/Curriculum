import { cn } from "@/lib/utils";
import * as React from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

const InputCurrencyField = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(({ className, type, ...props }, ref) => {
  return (
    <CurrencyInput
      ref={ref}
      autoComplete="off"
      decimalSeparator=","
      groupSeparator="."
      allowNegativeValue={false}
      prefix="R$"
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
InputCurrencyField.displayName = "InputCurrencyField";

export { InputCurrencyField };
