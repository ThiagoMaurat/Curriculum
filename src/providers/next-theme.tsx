"use client";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const NextThemesProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </ThemeProvider>
  );
};

export default NextThemesProvider;
